const express = require('express')
const router = express.Router();

const {
    addToCart,
    deleteCartItem,
    getCart
} = require('../controllers/cart')



//Method = "POST" => http://localhost:8080/cart/add-to-cart
router.post('/add-to-cart', addToCart )


//Method = "DELETE" => http://localhost:8080/cart/delete-cart-item
router.delete('/delete-cart-item', deleteCartItem)

//Method = "GET" => http://localhost:8080/cart/get-cart
router.get('/get-cart', getCart)

module.exports = router