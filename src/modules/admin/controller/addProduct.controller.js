const productModel = require('../../../../DB/models/product.model')
const cloudinaryConfig = require('../../../services/cloudinary')
const cloudinary = require("cloudinary").v2;
cloudinaryConfig()
const fs = require('fs');

const addProduct = async (req, res) => {
    try {
        if (req.validationErrorImg) {
            res.json({ message: " png او jpg او jpeg يجب ان يكون امتداد الصورة" })
        }

        if (req.files.length != 0) {
            const findProduct = await productModel.findOne({ productName: req.body.productName })
            if (findProduct) {
                for (let i = 0; i < req.files.length; i++) {
                    fs.unlinkSync(req.files[i].path);
                }
                res.json({ message: 'اسم المنتج مستخدم من قبل' });
            } else {
                const productPicURL = []
                const publicProductPicId = []
                for (let i = 0; i < req.files.length; i++) {
                    const imageURI = req.files[i].path;
                    const { secure_url, public_id } = await cloudinary.uploader.upload(imageURI, { folder: 'productPic', resource_type: "image", quality: 50 });
                    fs.unlinkSync(imageURI);
                    productPicURL.push(secure_url)
                    publicProductPicId.push(public_id)
                }
                req.body.productPicURL = productPicURL
                req.body.publicProductPicId = publicProductPicId
                const addedProduct = new productModel(req.body)
                const productData = await addedProduct.save()
                if (productData) {
                    res.json({ message: 'success' })
                } else {
                    res.json({ message: 'خطأ...لم يتم تسجيل هذا المنتج الي السيرفرات الخاصة بنا برجاء المحاولة مرة اخري' })
                }
            }
        } else {
            res.json({ message: 'من فضلك قم برفع صوره واحدة علي الاقل للمنتج' });
        }
    } catch (error) {
        res.json({ message: error.message })
    }
}

module.exports = addProduct