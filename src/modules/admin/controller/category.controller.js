const categoryModel = require('../../../../DB/models/category.model')

const addCategory = async (req, res) => {
    try {
        const { categoryName } = req.body
        const findCategory = await categoryModel.findOne({categoryName})
        if(findCategory){
            res.json({ message: 'تم تسجيل فئة بهذا الاسم من قبل' })
        }else{
            const addCategory = new categoryModel(req.body)
            await addCategory.save()
            res.json({ message: 'success' });
        }
    } catch (error) {
        res.json({ message: error.message })
    }
}

const getAllCategory = async (req, res) => {
    try {
        const findCategory = await categoryModel.find()
        if(findCategory.length != 0){
            res.json({ message: 'success', Categoies: findCategory });
        }else{
            res.json({ message: 'قائمة الفئات الخاصة بك فارغة' });
        }
    } catch (error) {
        res.json({ message: error.message })
    }
}

module.exports = {addCategory, getAllCategory}