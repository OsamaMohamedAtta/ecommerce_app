const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    userName: {
        type: String,
        required: [true, 'اسم المستخدم مطلوب'],
    },
    userPhone: {
        type: String,
        required: [true, 'رقم الهاتف مطلوب'],
    },
    cityName: {
        type: String,
        required: [true, 'المدينة مطلوبة'],
    },
    fullAddress: {
        type: String,
        required: [true, 'العنوان بالكامل مطلوب'],
    },
    notice: String,
    order: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product"
            },
            quantity: Number,
            size: String,
            color: String
        }
    ],
    couponUsed: String,
    amountPaid: Number,
    confirmedOrder: {
        type: Boolean,
        default: false
    },
    paymentPicURL: String,
    paymentPublicPicId:String,
    subTotal: Number
},{timestamps: true})

const orderModel = mongoose.model('order', orderSchema)
module.exports = orderModel
