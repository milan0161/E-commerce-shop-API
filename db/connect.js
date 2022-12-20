require('dotenv').config()

const {Sequelize} = require('sequelize')



const sequelize = new Sequelize('OnlineShop', 'root', process.env.DB_PASSWORD, {
    dialect: 'mysql',
    host: 'localhost' 
});


module.exports = sequelize;