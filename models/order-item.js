const {Sequelize, INTEGER} = require('sequelize');
const sequelize = require('../db/connect');


const OrderItem = sequelize.define('orderItem', {
    id:{
        type:INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: INTEGER
});


module.exports = OrderItem;