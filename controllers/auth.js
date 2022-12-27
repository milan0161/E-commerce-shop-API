const User = require('../models/user');
const {Sequelize} = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


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
        expiresIn: '1h'
        })
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
        expiresIn: '1h'
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
        const user = await User.destroy({
            where:{
                id:userId
            }
        })
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
    try {
        const userId = req.params.id
        const {name, password, email} = req.body;
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
}


module.exports = {
    singup,
    signin,
    getUser,
    deleteUser,
    updateUser
}