const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    adminName: {
        type: String,
        required: [true, 'اسم الادمن مطلوب'],
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
    block:{
        type: Boolean,
        default: false 
    },
},{timestamps: true})

const adminModel = mongoose.model('admin', adminSchema)
module.exports = adminModel