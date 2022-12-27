const {Sequelize, STRING, INTEGER, ENUM, BOOLEAN, ARRAY, TEXT, DECIMAL, FLOAT} = require('sequelize');
const User = require('./user')
const sequelize = require('../db/connect');


const Product = sequelize.define('product', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    model:{
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            min: 3,
        }
    },
    producer:{
        type: STRING,
        allowNull: false,
        validate:{
            min: 1,
            max: 15
        }
    },
    price: {
        type: INTEGER,
        allowNull:false,
        validate:{
            isDecimal:true
        }
    },
    processor: {
        type:ENUM('AMD', "INTEL", 'APPLE'),
        allowNull:false

    },
    processorModel: {
        type:STRING,
        allowNull: false
    },
    ram:{
        type: INTEGER,
        allowNull:false
    },
    screenDiag:{
        type:FLOAT,
        allowNull: false
    },
    screenResolution:{
        type:STRING,
        allowNull:false
    },
    screenType:{
        type:STRING
    },
    GPU:{
        type:ENUM('dedicated', 'integrated'),
        allowNull:false
        
    },
    GPUModel:{
        type:STRING,
        allowNull:false
    },
    ssd:{
        type:INTEGER,
        allowNull:false
    },
    ssdModel:{
        type:STRING
    },
    description:{
        type:STRING,
        allowNull:false,
        validate:{
            min:3,
            max:50
        }
    },
    OS:{
        type:ENUM('Windows', "Linux", "MAC"),
        allowNull:true
    },
    images:{
        type:STRING
        
    },
    battery:{
        type:STRING
    },
    material:{
        type:STRING
    }  
}
,{timestamps:true}
);



Product.sync()
module.exports = Product;