const productRouter = require('express').Router()
const {getAllProduct, getProductByCategory, getProductDetails, searchProduct} = require('./controller/getProduct.controller')

productRouter.get('/product/getAllProduct/:pageNumber', getAllProduct)
productRouter.get('/product/getProductByCategory/:pageNumber/:category', getProductByCategory)
productRouter.get('/product/getProductDetails/:ProductID', getProductDetails)
productRouter.get('/product/searchProduct/:keySearch', searchProduct)

module.exports = productRouter