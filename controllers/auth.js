const {Sequelize} = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();
const transport = require('../utils/transport')



const singup = async (req, res, next) => {
    try {
        const {name, email, password} = req.body;
        const userExist = await User.findOne({
            where:{
                email:email
            }
        })
        if(userExist){
            const error = new Error('User already exist')
            error.statusCode = 400;
            throw error;
        };
        let role;
        const isFirstAccount = await User.count();
        if(isFirstAccount === 0){
            role = 'admin'
        }else{
            role = 'client'
        }
        const hashedPw = await bcrypt.hash(password, 12)
        const user = await User.create({
            name:name,
            email:email,
            password:hashedPw,
            role:role
        });
        const token = jwt.sign({
            email: user.email,
            userId: user.id,
            role: user.role
       },process.env.JWT_SECRET,{
        expiresIn: '10h'
        });

        
        transport.sendMail({
            to: email,
            from: 'OnlineShop <milan.bullet@gmail.com>',
            subject: 'Signup succeeded',
            html:`<h1> You successfully signed up to OnlineShop!</h1>
                    <h2>Welcome ${name}</h2>`
        });
      

        res.status(201).json({token: token, user:user})
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500;
       }
       next(error);
    }
   
};

const signin = async (req, res, next) => {
    const {email, password} = req.body;

    try {

       const user = await User.findOne({where:{
        email:email
       }})
       if(!user){
        const error = new Error ('User with this email can not be found');
        error.statusCode = 401;
        throw error
       } 
       const comparePw = await bcrypt.compare(password, user.password);
       if(!comparePw){
        const error = new Error('Wrong password');
        error.statusCode = 401;
        throw error;
       }
       const token = jwt.sign({
        email: user.email,
        userId: user.id,
        role:user.role
       },process.env.JWT_SECRET,{
        expiresIn: '10h'
       })

       res.status(200).json({token: token, userId:user.id})
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500;
       }
       next(error);
    }
};

const getUser = async (req, res, next) => {
   const userId = req.params.id
   
   try {
        const user = await User.findByPk(userId);
        res.status(200).json({
        user:user
       })
    
   } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500;
   }
    next(error);
   }
}

const deleteUser = async (req, res, next) => {
    const userId = req.params.id;
    try {
        const authToken = req.headers.authorization.split(' ')[1]
        if(!authToken){
            const error = new Error('Not authorized');
            error.statusCode = 401;
            throw error;
        }
        const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET)
        console.log(decodedToken)
        if(userId.toString() === decodedToken.userId.toString() || decodedToken.role === 'admin'){
            const user = await User.destroy({
                where:{
                    id:userId
                }
            })
        }else {
            const error = new Error('Not authorized for that action');
            error.statusCode = 401;
            throw error;
        }
       
        res.status(200).json({message:'User Deleted'})
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500;
       }
        next(error);
    }
}
//Funkcija update za korisnika, promena korisnickih podataka, ne moraju svi da se menjaju, vec po zelji.
const updateUser = async (req, res, next) => {
        const userId = req.params.id
    try {
        const authToken = req.headers.authorization.split(' ')[1]
        if(!authToken){
            const error = new Error('Not authorized');
            error.statusCode = 401;
            throw error;
        }
        const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET)
        if(userId.toString() !== decodedToken.userId.toString()){
            const error = new Error('Not authorized');
            error.statusCode = 401;
            throw error;
        }
        const { name, password, email } = req.body;
        console.log(name)
        const hashedPw = await bcrypt.hash(password, 12);
        const user = await User.findOne({
            where:{
                id: userId
            }
        })
        const oldName = user.name;
        const oldPassword = user.password;
        const oldEmail = user.email;
        if(!name){
            user.name = oldName;
        }else{
            user.name = name;
        };

        if(!email){
            user.email = oldEmail;
        }else{
            user.email = email;
        };
        if(password){
            user.password = hashedPw;
        }
        await user.save()

    res.status(200).json({user:user})
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500;
       }
        next(error);
    }
};


const changePassword = async (req, res, next) => {
    const userId = req.params.id
    const {pass, newPassword} = req.body
    try {
        const authToken = req.headers.authorization.split(' ')[1]
        if(!authToken){
            const error = new Error('Not authorized');
            error.statusCode = 401;
            throw error;
        }
        const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET)
        if(userId.toString() !== decodedToken.userId.toString()){
            const error = new Error('Not authorized');
            error.statusCode = 401;
            throw error;
        }
        const user = await User.findByPk(userId);
        const comparePw = await bcrypt.compare(pass, user.password);
       if(!comparePw){
        const error = new Error('Wrong password');
        error.statusCode = 401;
        throw error;
       }
       const hashedNewPass = await bcrypt.hash(newPassword, 12)
       user.password = hashedNewPass
       await user.save()
       res.status(200).json({message: 'uspesno ste promenili password'})
        
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500;
       }
        next(error);
    }

}


module.exports = {
    singup,
    signin,
    getUser,
    deleteUser,
    updateUser,
    changePassword
}