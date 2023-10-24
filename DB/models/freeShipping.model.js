const mongoose = require("mongoose");

const freeShippingSchema = new mongoose.Schema({
    title: {
        type: String,
        default: 'checkFreeShipping'
    },
    freeShipping: {
        type: Boolean,
        default: false
    },
})

const freeShippingModel = mongoose.model('freeShipping', freeShippingSchema)
module.exports = freeShippingModel