const User = require('../models/user');
const Product = require('../models/product');
const Cart = require('../models/cart');
const Order = require('../models/order');
const OrderItem = require('../models/order-item')
const {Sequelize} = require('sequelize');
const CartItem = require('../models/cart-items');
const jwt = require('jsonwebtoken')


const createOrder = async (req, res, next) => {
    const aToken = req.headers.authorization.split(' ')[1];
    const authUser = jwt.verify(aToken, process.env.JWT_SECRET);
    const userId = authUser.userId;

   try {
    if(!userId){
        const error = new Error('Please sign up or login')
        error.statusCode = 401;
        throw error
    }
    const user = await User.findByPk(userId)
    const cart = await Cart.findOne({
        where:{
            userId:user.id
        }
    });

    const products = await cart.getProducts();
  
    const order = await user.createOrder();
   
    const orderItems = await order.addProducts(products.map(product => {
        product.orderItem = { quantity: product.CartItem.quantity}
         return product;
    }))    
    
    
    res.status(200).json({order:order, products: orderItems})
   } catch (error) {
    if(!error.statusCode){
        error.statusCode = 500;
    }
    next(error)
   }
};

const getOrders = async (req, res, next) => {
    const aToken = req.headers.authorization.split(' ')[1];
    const authUser = jwt.verify(aToken, process.env.JWT_SECRET);
    const userId = authUser.userId;

    try {
        if(!userId){
            const error = new Error('Please sign up or login')
            error.statusCode = 401;
            throw error
        }
        const orders = await Order.findAll({
            where:{
                userId:userId
            }
        })
        res.status(200).json(orders)
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error)
    }
}

module.exports = {
    createOrder,
    getOrders
}