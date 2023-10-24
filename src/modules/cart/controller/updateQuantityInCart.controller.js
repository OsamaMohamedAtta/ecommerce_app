const cartModel = require('../../../../DB/models/cart.model')
const productModel = require('../../../../DB/models/product.model')

const updateQuantityInCart = async (req, res) => {
    try {
        const { ProductID, newQuantity } = req.params
        const findProduct = await productModel.findById(ProductID)
        if (findProduct) {
            const findCart = await cartModel.findOne({ userId: req.userData._id }).populate([{
                path: 'products.productId',
                model: 'product',
                select: 'productName price productPicURL'
            }])
            if (findCart) {
                const findProductInCart = findCart.products.map(e => e.productId._id.toString()).indexOf(ProductID)
                if (findProductInCart != -1) {
                    findCart.subTotal = (findCart.subTotal - (findCart.products[findProductInCart].quantity * findProduct.price)) + (findProduct.price * parseInt(newQuantity))
                    findCart.products[findProductInCart].quantity = parseInt(newQuantity)
                    const cart = await findCart.save()
                    if (cart) {
                        res.json({ message: 'success', cart })
                    } else {
                        res.json({ message: 'خطأ...لم تتم عملية تعديل كمية المنتج حاول مرة اخري' })
                    }
                } else {
                    res.json({ message: 'هذا المنتج غير متوفر في العربة' })
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


module.exports = updateQuantityInCart