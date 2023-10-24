const categoryModel = require('../../../../DB/models/category.model')

const getCategory = async (req, res) => {
    try {
        const findCategory = await categoryModel.find()
        if(findCategory.length != 0){
            res.json({ message: 'success', Categoies: findCategory });
        }else{
            res.json({ message: 'قائمة الفئات فارغة' });
        }
    } catch (error) {
        res.json({ message: error.message })
    }
}

module.exports =  getCategory