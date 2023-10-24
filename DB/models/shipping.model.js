const mongoose = require("mongoose");

const shippingSchema = new mongoose.Schema({
    cityName: {
        type: String,
        required: [true, 'اسم المدينة مطلوب'],
    },
    shippingPrice: {
        type: Number,
        required: [true, 'سعر الشحن مطلوب'],
    },
})

const shippingModel = mongoose.model('shipping', shippingSchema)
module.exports = shippingModel
