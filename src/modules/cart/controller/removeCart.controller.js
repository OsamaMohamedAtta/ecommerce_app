const cartModel = require('../../../../DB/models/cart.model')
const productModel = require('../../../../DB/models/product.model')

const removeFromCart = async (req, res) => {
    try {
        const { ProductID } = req.params
        const findProduct = await productModel.findById(ProductID)
        if (findProduct) {
            const findCart = await cartModel.findOne({ userId: req.userData._id }).populate([{
                path: 'products.productId',
                model: 'product',
                select: 'productName price productPicURL'
            }])
            if (findCart) {
                const newCartList = findCart.products.filter(e => e.productId._id.toString() != ProductID)
                const findProductInCart = findCart.products.map(e => e.productId._id.toString()).indexOf(ProductID)
                if (findProductInCart != -1)
                    findCart.subTotal = findCart.subTotal - (findCart.products[findProductInCart].quantity * findProduct.price)
                findCart.products = newCartList
                const cart = await findCart.save()
                if (cart) {
                    if (cart.products.length == 0) {
                        res.json({ message: 'العربة فارغة' })
                    } else {
                        res.json({ message: 'success', cart })
                    }
                } else {
                    res.json({ message: 'خطأ...لم يتم حذف المنتج من العربة حاول مرة اخري' })
                }
            } else {
                res.json({ message: 'العربة الخاصة بحسابك فارغة' })
            }
        } else {
            res.json({ message: 'هذا المنتج غير متوفر في الوقت الحالي' })
        }
    } catch (error) {
        res.json({ message: error.message })
    }
}

const removeAllCart = async (req, res) => {
    try {
        const findCart = await cartModel.findOne({ userId: req.userData._id })
        if (findCart) {
            await cartModel.findOneAndRemove({ userId: req.userData._id })
            res.json({ message: 'success' })
        } else {
            res.json({ message: 'العربة الخاصة بحسابك فارغة' })
        }

    } catch (error) {
        res.json({ message: error.message })
    }
}

module.exports = { removeFromCart, removeAllCart }