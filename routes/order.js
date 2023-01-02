const express = require('express');
const router = express.Router();

const { 
    createOrder,
    getOrders
 } = require('../controllers/order')


//Method = "POST" => http://localhost:8080/order/create-order
router.post('/create-order', createOrder);

router.get('/get-orders', getOrders);




module.exports = router;