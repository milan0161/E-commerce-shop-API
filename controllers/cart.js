const {Sequelize} = require('sequelize');
const sequelize = require('sequelize')
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Cart = require('../models/cart');
const CartItem = require('../models/cart-items');
const Product = require('../models/product');

require('dotenv').config()



const addToCart =  async (req, res, next) => {
    const aToken = req.headers.authorization.split(' ')[1]
    const authUser = jwt.verify(aToken, process.env.JWT_SECRET);
    const userId = authUser.userId
    const prodId = req.body.prodId
    
    //looking  for cart
    try {
        const currentUser = await User.findByPk(userId);
        let cart = await Cart.findOne({
            where:{
                userId: currentUser.id
            }
        })
        //if no cart, create it using current user
    if(cart == null) {
        cart = await Cart.create({
            userId: currentUser.id
        })  
    };

    //looking for specific cart item you want to put in cart 
    let currentProducts = await CartItem.findAll({
        where:{
            productId:prodId
        }
    });
    let newQuantity;
    //if no item in cart, create it
    if(currentProducts.length === 0 ){ 
       currentProducts = await CartItem.create({
            CartId:cart.id,
            productId:prodId,
            quantity:1
    })
       console.log(currentProducts)
    }else{
        newQuantity = currentProducts[0].quantity + 1
    }
    //else add quantity to it
    const product = await Product.findByPk(prodId);
    await cart.addProduct(product, {through: {quantity: newQuantity}})
    
    //find all products in cart and send it
    currentProducts = await CartItem.findAll({
        where:{
            CartId:cart.id
        }
    });  
        res.status(200).json({message:'Uspesno ste ubacili u korpu', cart:cart, itemList: currentProducts})
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error)
    }
}


const getCart = async (req, res, next) => {
    const aToken = req.headers.authorization.split(' ')[1]
    const authUser = jwt.verify(aToken, process.env.JWT_SECRET)
    const userId = authUser.userId
    try {
        const currentUser = await User.findByPk(userId);

        let cart = await Cart.findOne({
            where:{
                userId: currentUser.id
            }
        });

        let currentProducts = await CartItem.findAll({
            where:{
                CartId:cart.id,
            }
        });

        res.status(200).json({cart:cart, products:currentProducts})
    } catch (error) {
          
    }


}

const deleteCartItem = async (req, res, next) => {
    const aToken = req.headers.authorization.split(' ')[1]
    const authUser = jwt.verify(aToken, process.env.JWT_SECRET);
    const userId = authUser.userId
    const prodId = req.body.prodId
    try {
        const currentUser = await User.findByPk(userId);
        let cart = await Cart.findOne({
            where:{
                userId: currentUser.id
            }
        });
        if(cart == null) {
           const error = new Error('No items in cart');
           error.statusCode = 404;
           throw error  
        };

        let currentProducts = await CartItem.findAll({
            where:{
                CartId:cart.id,
                productId:prodId
            }
        })
        if(currentProducts.length < 1){
            const error = new Error('No item in cart to remove')
            error.statusCode = 404;
            throw error;
        }   
        await currentProducts[0].destroy()
        res.status(200).json({message:'Product removed from cart'})
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error)
    }

}

module.exports = {
    addToCart,
    deleteCartItem,
    getCart
}