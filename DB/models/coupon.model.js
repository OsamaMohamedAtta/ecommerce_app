const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
    couponCode: {
        type: String,
        required: [true, 'كود الخصم مطلوب'],
    },
    discountAmount: {
        type: Number,
        required: [true, 'مقدار الخصم مطلوب'],
    },
    discountType: {
        type: String,
        required: [true, 'نوع الخصم مطلوب'],
        enum: ['مادي', 'نسبة مئوية']
    },
    inWork: {
        type: Boolean,
        default: true
    },
})

const couponModel = mongoose.model('coupon', couponSchema)
module.exports = couponModel