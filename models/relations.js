const sequelize = require('../db/connect');
const {Sequelize} = require('sequelize')
// require('dotenv').config()



//models
const User = require('./user')
const Product = require('./product')
const Cart = require('./cart')
const CartItems = require('./cart-items')


//relations
Cart.belongsToMany(Product, {through: CartItems});
Product.belongsToMany(Cart, {through: CartItems})
User.hasOne(Cart);
Cart.belongsTo(User);

sequelize.sync()

module.exports = sequelize










