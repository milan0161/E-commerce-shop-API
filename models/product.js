const {Sequelize, STRING, INTEGER, ENUM, BOOLEAN, ARRAY, TEXT} = require('sequelize');

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
    description:{
        type:STRING,
        allowNull:false,
        validate:{
            min:5,
            max:55
        }
    },
    images:{
        type:STRING,
        allowNull:false
        
    }
}
,{timestamps:true}
)

Product.sync()
module.exports = Product;