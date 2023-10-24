const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, 'اسم المنتج مطلوب'],
        unique: [true, 'اسم المنتج مستخدم من قبل']
    },
    desc: String,
    price: Number,
    productPicURL: [String],
    publicProductPicId: [String],
    category: String,
    size: [String],
    color: [String],
    commentList:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: "comment"
    },
},{timestamps: true})

const productModel = mongoose.model('product', productSchema)
module.exports = productModel