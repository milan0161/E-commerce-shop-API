const express = require('express')
const router = express.Router();

const {
    addToCart,
    deleteCartItem
} = require('../controllers/cart')




router.post('/add-to-cart', addToCart )


router.delete('/delete-cart-item', deleteCartItem)


module.exports = router