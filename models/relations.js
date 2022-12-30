const sequelize = require('../db/connect');
const {Sequelize} = require('sequelize');
// require('dotenv').config()



//models
const User = require('./user');
const Product = require('./product');
const Cart = require('./cart');
const CartItems = require('./cart-items');
const Order = require('./order');
const OrderItem = require('./order-item');


//relations
Cart.belongsToMany(Product, {through: CartItems});
Product.belongsToMany(Cart, {through: CartItems});
User.hasOne(Cart);
Cart.belongsTo(User);
User.hasMany(Order);
Order.belongsTo(User);
Order.belongsToMany(Product, {through: OrderItem});

sequelize.sync()

module.exports = sequelize










