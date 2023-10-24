const categoryRouter = require('express').Router()
const getCategory = require('./controller/getCategory.controller')

categoryRouter.get('/category/getCategory', getCategory)

module.exports = categoryRouter