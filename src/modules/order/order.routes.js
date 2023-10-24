const orderRouter = require('express').Router()
const addOrder = require('./controller/addOrder.controller')
const userAuth = require('../../middleware/userAuth')
const upload = require('../../middleware/handleMulter')

orderRouter.post('/order/addOrder',userAuth ,upload.single("image"), addOrder)

module.exports = orderRouter