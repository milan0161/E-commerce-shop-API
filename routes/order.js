const express = require('express');
const router = express.Router();

const { createOrder } = require('../controllers/order')


//Method = "POST" => http://localhost:8080/order/create-order
router.post('/create-order', createOrder);




module.exports = router;