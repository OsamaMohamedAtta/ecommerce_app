const productModel = require('../../../../DB/models/product.model')

const getAllProduct = async (req, res) => {
    try {
        const { pageNumber } = req.params
        const skipNumber = (parseInt(pageNumber) - 1) * 20
        const product = await productModel.find().skip(skipNumber).limit(20)
        const countPage = await productModel.countDocuments()
        const numberOfPages = countPage / 20
        let decNumber = '0.' + numberOfPages.toString().split('.')[1]
        if (numberOfPages.toString().split('.')[1] == undefined)
            decNumber = 1
        res.json({ message: "success", numberOfPages: numberOfPages + (1 - (parseFloat(decNumber))), product })
    } catch (error) {
        res.json({ message: error.message })
    }
}

const getProductByCategory = async (req, res) => {
    try {
        const { pageNumber, category } = req.params
        const skipNumber = (parseInt(pageNumber) - 1) * 20
        const products = await productModel.find({ category }).skip(skipNumber).limit(20)
        if (products.length != 0) {
            const countPage = await productModel.find({ category })
            const numberOfPages = countPage.length / 20
            let decNumber = '0.' + numberOfPages.toString().split('.')[1]
            if (numberOfPages.toString().split('.')[1] == undefined)
                decNumber = 1
            res.json({ message: "success", numberOfPages: numberOfPages + (1 - (parseFloat(decNumber))), products })
        } else {
            res.json({ message: "لا توجد منتجات مرتبطة بهذه الفئة" })
        }
    } catch (error) {
        res.json({ message: error.message })
    }
}

const getProductDetails = async (req, res) => {
    try {
        const { ProductID } = req.params
        const productDetails = await productModel.findById(ProductID).populate([
            {
            path: 'commentList',
            populate: {
                path: 'userId',
                model: 'user',
                select: 'userName picURL'
            }
            }])
        if (productDetails) {
            res.json({ message: "success", productDetails })
        } else {
            res.json({ message: "خطأ...هذا المنتج غير متوفر" })
        }
    } catch (error) {
        res.json({ message: error.message })
    }
}

const searchProduct = async (req, res) => {
    try {
        const { keySearch } = req.params
        const products = await productModel.find({
            "$or": [
                { productName: { $regex: keySearch } },
                { category: { $regex: keySearch } }
            ]
        })
        res.json({ message: "success", products })
    } catch (error) {
        res.json({ message: error.message })
    }
}

module.exports = { getAllProduct, getProductByCategory, getProductDetails, searchProduct }