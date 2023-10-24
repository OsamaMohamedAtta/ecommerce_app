const authRouter = require('express').Router()
const signUp = require('./controller/signUp.controller')
const signIn = require('./controller/signIn.controller.js')

authRouter.post('/auth/signUp', signUp)
authRouter.post('/auth/signIn', signIn)

module.exports = authRouter