const express = require('express');
const router = express.Router();

const {createProduct} = require('../controllers/products')

// Method = "POST" => http://localhost:8080/products/create-product
router.post('/create-product', createProduct)



module.exports = router;