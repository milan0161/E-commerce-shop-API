const {Sequelize, INTEGER} = require('sequelize')
const sequelize = require('../db/connect');


const Order = sequelize.define('order', {
    id:{
        type:INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    }
});


module.exports = Order;