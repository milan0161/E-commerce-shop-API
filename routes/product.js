const express = require('express');
const router = express.Router();

const isAuth = require('../middleware/auth')

const {
    createProduct,
    getAllProducts,
    getOneProduct,
    updateProduct,
    deleteProduct,
    getProducts

} = require('../controllers/products')

// Method = "POST" => http://localhost:8080/products/create-product
router.post('/create-product', isAuth,createProduct);

//Method = 'GET' => http://localhost:8080/products/all-products
router.get('/all-products', getAllProducts);

//Method = 'GET' => http://localhost:8080/products/get-products
router.get('/get-products', getProducts);

//Method = "GET" => http://localhost:8080/products/one-product/:id
router.get('/one-product/:id', getOneProduct);

//Method = "PATCH" => http://localhost:8080/products/update-product/:id
router.patch('/update-product/:id', isAuth,updateProduct);

//Method = "DELETE" => http://localhost:8080/products/delete-product/:id
router.delete('/delete-product/:id', isAuth, deleteProduct);

module.exports = router;