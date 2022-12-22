const {Sequelize, STRING, INTEGER, ENUM, BOOLEAN, ARRAY} = require('sequelize');

const sequelize = require('../db/connect');


const Product = sequelize.define('product', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            min: 3,
        }
    },
    color:{
        type:STRING,
        allowNull:false
    },
    size:{
        type:INTEGER,
        allowNull:false
    },
    category:{
        type:ENUM('male', 'female'),
        allowNull: false
    },
    kids:{
        type:BOOLEAN,
        defaultValue:false
    },
    material:{
        type:STRING,
        allowNull: false
    },
    images:{
        type:ARRAY(STRING),
        
    },
    description:{
        type:STRING,
        allowNull:false,
        validate:{
            min:5,
            max:55
        }
    }
},{timestamps:true})

Product.sync()
module.exports = Product;