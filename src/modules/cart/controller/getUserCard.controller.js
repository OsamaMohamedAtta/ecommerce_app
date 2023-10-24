const cartModel = require('../../../../DB/models/cart.model')

const getUserCart = async (req, res) => {
    try {
        const findCart = await cartModel.findOne({ userId: req.userData._id }).populate([{
            path: 'products.productId',
            model: 'product',
            select: 'productName price productPicURL'
        }])
        if (findCart) {
            if (findCart.products.length == 0) {
                res.json({ message: 'العربة فارغة' })
            } else {
                res.json({ message: 'success', cart: findCart })
            }
        } else {
            res.json({ message: 'العربة فارغة' })
        }
    } catch (error) {
        res.json({ message: error.message })
    }
}

module.exports = getUserCart