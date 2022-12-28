const {Sequelize, INTEGER} = require('sequelize');
const sequelize = require('../db/connect')



const Cart = sequelize.define('Cart', {
    id:{
        type:INTEGER,
        primaryKey: true,
        autoIncrement: true
        }
      
    },{timestamps:true});




module.exports = Cart;


