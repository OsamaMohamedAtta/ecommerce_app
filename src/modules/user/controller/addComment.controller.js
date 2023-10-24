const productModel = require('../../../../DB/models/product.model')
const userModel = require('../../../../DB/models/user.model')
const commentModel = require('../../../../DB/models/comment.model')


const addComment = async (req, res) => {
    try {
        const { ProductID } = req.params
        const findProduct = await productModel.findById(ProductID)
        if (findProduct) {
            req.body.userId = req.userData._id
            const userComment = new commentModel(req.body)
            const addComment = await userComment.save()
            if (addComment) {
                findProduct.commentList.push(addComment._id)
                await findProduct.save()
                res.json({ message: "success" })
            } else {
                res.json({ message: 'حدث خطأ ما لم يتم اضافة التعليق الخاص بك حاول مره اخري' })
            }
        } else {
            res.json({ message: 'هذا المنتج غير متوفر في الوقت الحالي' })
        }
    } catch (error) {
        res.json({ message: error.message })
    }
}

module.exports = addComment