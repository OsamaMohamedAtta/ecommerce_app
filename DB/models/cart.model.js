const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    products: [
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
    subTotal: Number
})

const cartModel = mongoose.model('cart', cartSchema)
module.exports = cartModel
