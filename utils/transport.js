const nodemailer = require('nodemailer');
require('dotenv').config();




 

    let transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS
        }
    })



module.exports = transport


