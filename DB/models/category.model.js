const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: [true, 'اسم الفئة مطلوب'],
        unique: [true, 'اسم الفئة مستخدم من قبل']
    },
})

const categoryModel = mongoose.model('category', categorySchema)
module.exports = categoryModel