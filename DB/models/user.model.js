const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'اسم المستخدم مطلوب'],
        minlength: [6, 'يجب ان لا يقل اسم المستخدم عن 6 احرف'],
        maxlength: [20, 'يجب ان لا يزيد اسم المستخدم عن 20 حرف']
    },
    email: {
        type: String,
        required: [true, 'البريد الالكتروني مطلوب'],
        unique: [true, 'البريد الالكتروني مستخدم من قبل']
    },
    password: {
        type: String,
        required: [true, 'كلمة السر مطلوبة'],
    },
    gender:{
        type: String,
        required: [true, 'النوع مطلوب'],
        enum: ['ذكر', 'انثي']
    },
    picURL:{
        type: String,
        default: 'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg' 
    },
    publicPicId:String,
    block:{
        type: Boolean,
        default: false 
    },
    verify:{
        type: Boolean,
        default: false 
    },
    favoriteList:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: "product"
    },
    couponList: [String]
},{timestamps: true})

const userModel = mongoose.model('user', userSchema)
module.exports = userModel