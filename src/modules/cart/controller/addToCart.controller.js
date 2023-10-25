const cartModel = require('../../../../DB/models/cart.model')
const productModel = require('../../../../DB/models/product.model')

const addToCart = async (req, res) => {
    try {
        const { ProductID } = req.params
        const findProduct = await productModel.findById(ProductID)
        if (findProduct) {
            const findCart = await cartModel.findOne({ userId: req.userData._id })
            if (findCart) {
                const findProductInCart = findCart.products.map(e => e.productId.toString()).indexOf(ProductID)
                if (findProductInCart != -1) {
                    findCart.subTotal = (findCart.subTotal - (findCart.products[findProductInCart].quantity * findProduct.price)) + (findProduct.price * req.body.quantity)
                    req.body.productId = ProductID
                    findCart.products[findProductInCart] = req.body
                    const cart = await findCart.save()
                    if (cart) {
                        res.json({ message: 'success' })
                    } else {
                        res.json({ message: 'خطأ...لم يتم اضافة المنتج الي العربة حاول مرة اخري' })
                    }
                } else {
                    findCart.subTotal = findCart.subTotal + (findProduct.price * req.body.quantity)
                    req.body.productId = ProductID
                    findCart.products.push(req.body)
                    const cart = await findCart.save()
                    if (cart) {
                        res.json({ message: 'success' })
                    } else {
                        res.json({ message: 'خطأ...لم يتم اضافة المنتج الي العربة حاول مرة اخري' })
                    }
                }
            } else {
                const products = []
                req.body.productId = ProductID
                products.push(req.body)
                req.body.products = products
                req.body.userId = req.userData._id
                req.body.subTotal = findProduct.price * req.body.quantity
                const addProduct = new cartModel(req.body)
                const cart = await addProduct.save()
                if (cart) {
                    res.json({ message: 'success' })
                } else {
                    res.json({ message: 'خطأ...لم يتم اضافة المنتج الي العربة حاول مرة اخري' })
                }
            }
        } else {
            res.json({ message: 'هذا المنتج غير متوفر في الوقت الحالي' })
        }
    } catch (error) {
        res.json({ message: error.message })
    }
}

module.exports = addToCart