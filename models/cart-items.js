const {Sequelize, INTEGER} = require('sequelize');
const sequelize = require('../db/connect')


const cartItem = sequelize.define('CartItem',{
    id:{
        type:INTEGER,
        autoIncrement: true,
        allowNull:false,
        primaryKey:true
    },
    quantity:INTEGER
    })


module.exports = cartItem