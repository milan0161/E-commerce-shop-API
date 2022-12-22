const {Sequelize, STRING} = require('sequelize');

const sequelize = require('../db/connect');

const User = sequelize.define('user', {

    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            min:3,
            max:25
        }
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password:{
        type: Sequelize.STRING,
        validate: {
            min:5,
            max:25
        }
    },
    role:{
        type: Sequelize.ENUM('client', 'admin'),
        defaultValue: "client"
    }
    
},{timestamps:true});

User.sync()
module.exports = User;