const userModel = require('../../../../DB/models/user.model')
const productModel = require('../../../../DB/models/product.model')

const addToFavorite = async (req, res) => {
    try {
        const { ProductID } = req.params
        const findProduct = await productModel.findById(ProductID)
        if (findProduct) {
            if (req.userData.favoriteList.length != 0) {
                const findProductID = req.userData.favoriteList.find(e => e == ProductID)
                if (findProductID) {
                    res.json({ message: 'تم اضافة هذا المنتج الي قائمة المفضلة الخاصه بك من قبل' })
                } else {
                    req.userData.favoriteList.push(ProductID)
                    const addToFavorite = await userModel.findByIdAndUpdate(req.userData._id, { favoriteList: req.userData.favoriteList })
                    if (addToFavorite) {
                        res.json({ message: 'success' })
                    } else {
                        res.json({ message: 'حدث خطأ ما لم يتم اضافة المنتج الي قائمة المفضلة' })
                    }
                }
            } else {
                req.userData.favoriteList.push(ProductID)
                const addToFavorite = await userModel.findByIdAndUpdate(req.userData._id, { favoriteList: req.userData.favoriteList })
                if (addToFavorite) {
                    res.json({ message: 'success' })
                } else {
                    res.json({ message: 'حدث خطأ ما لم يتم اضافة المنتج الي قائمة المفضلة' })
                }
            }
        } else {
            res.json({ message: 'خطأ هذا المنتج غير متوفر في الوقت الحالي' })
        }
    } catch (error) {
        res.json({ message: error.message })
    }
}

const getFavoriteList = async (req, res) => {
    try {
        if (req.userData.favoriteList.length != 0) {
            const favoriteList = await userModel.findById(req.userData._id).select('favoriteList').populate(['favoriteList'])
            res.json({ message: 'success', favoriteList })
        } else {
            res.json({ message: 'قائمة المفضلة الخاصة بك فارغة' })
        }
    } catch (error) {
        res.json({ message: error.message })
    }
}

const removeFromFavoriteList = async (req, res) => {
    try {
        const { ProductID } = req.params
        const findProduct = await productModel.findById(ProductID)
        if (findProduct) {
            const newFavList = req.userData.favoriteList.filter(id => id != ProductID)
            const updateFavorite = await userModel.findByIdAndUpdate(req.userData._id, { favoriteList: newFavList })
            if (updateFavorite) {
                res.json({ message: 'success' })
            } else {
                res.json({ message: 'حدث خطأ ما لم يتم حذف المنتج من قائمة المفضلة حاول مره اخري' })
            }
        } else {
            res.json({ message: 'هذا المنتج غير متوفر في الوقت الحالي' })
        }
    } catch (error) {
        res.json({ message: error.message })
    }
}

module.exports = { addToFavorite, getFavoriteList, removeFromFavoriteList }