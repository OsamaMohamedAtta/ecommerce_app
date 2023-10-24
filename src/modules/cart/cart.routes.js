const cartRouter = require('express').Router()
const addToCart = require('./controller/addToCart.controller')
const getUserCart = require('./controller/getUserCard.controller')
const {removeFromCart, removeAllCart} = require('./controller/removeCart.controller')
const updateQuantityInCart = require('./controller/updateQuantityInCart.controller')
const userAuth = require('../../middleware/userAuth')

cartRouter.post('/cart/addToCart/:ProductID', userAuth, addToCart)
cartRouter.get('/cart/getUserCart', userAuth, getUserCart)
cartRouter.put('/cart/removeFromCart/:ProductID', userAuth, removeFromCart)
cartRouter.delete('/cart/removeAllCart', userAuth, removeAllCart)
cartRouter.put('/cart/updateQuantityInCart/:ProductID/:newQuantity', userAuth, updateQuantityInCart)

module.exports = cartRouter