const shippingRouter = require('express').Router()
const getShippingPrice = require('./controller/getShippingPrice.controller')
const createShippingFree = require('./controller/createShippingFree.controller')
const userAuth = require('../../middleware/userAuth')

shippingRouter.get('/shipping/getShippingPrice/:cityName', userAuth, getShippingPrice)
shippingRouter.post('/shipping/createShippingFree', createShippingFree)

module.exports = shippingRouter