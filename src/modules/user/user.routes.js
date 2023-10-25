const userRouter = require('express').Router()
const confirmed = require('./controller/confirmed.controller')
const updateProfilePic = require('./controller/updateProfilePic.controller')
const { resetPassword, senderResetPassword } = require('./controller/resetPassword.controller')
const {addToFavorite, getFavoriteList, removeFromFavoriteList} = require('./controller/favorite.controller')
const addComment = require('./controller/addComment.controller')
const userAuth = require('../../middleware/userAuth')
const upload = require('../../middleware/handleMulter')

userRouter.put('/user/confirmed/:userToken', confirmed)
userRouter.put('/user/updateProfilePic',userAuth ,upload.single("image"), updateProfilePic)
userRouter.get('/user/senderResetPassword/:email', senderResetPassword)
userRouter.put('/user/resetPassword/:userToken', resetPassword)
userRouter.post('/user/addToFavorite/:ProductID', userAuth, addToFavorite)
userRouter.get('/user/getFavoriteList', userAuth, getFavoriteList)
userRouter.put('/user/removeFromFavoriteList/:ProductID', userAuth, removeFromFavoriteList)
userRouter.post('/user/addComment/:ProductID', userAuth, addComment)

module.exports = userRouter