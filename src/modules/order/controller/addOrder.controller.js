const orderModel = require('../../../../DB/models/order.model')
const couponModel = require('../../../../DB/models/coupon.model')
const userModel = require('../../../../DB/models/user.model')
const cloudinaryConfig = require('../../../services/cloudinary')
const cloudinary = require("cloudinary").v2;
cloudinaryConfig()
const fs = require('fs');

const addOrder = async (req, res) => {
    try {
        if (req.validationErrorImg) {
            res.json({ message: " png او jpg او jpeg يجب ان يكون امتداد الصورة" })
        }

        if (req.file) {
            if (req.body.couponUsed) {
                const findCoupon = await couponModel.findOne({ couponCode: req.body.couponUsed })
                if (findCoupon) {
                    if (findCoupon.inWork) {
                        const checkIfCouponUsed = req.userData.couponList.includes(req.body.couponUsed)
                        if (checkIfCouponUsed) {
                            res.json({ message: "تم استخدام كود الخصم من قبل" });
                            fs.unlinkSync(req.file.path);
                        } else {
                            const newCouponList = req.userData.couponList
                            newCouponList.push(req.body.couponUsed)
                            await userModel.findByIdAndUpdate(req.userData._id, { couponList: newCouponList })
                            const imageURI = req.file.path;
                            const { secure_url, public_id } = await cloudinary.uploader.upload(imageURI, { folder: 'paymentPic', resource_type: "image", quality: 50 });
                            fs.unlinkSync(imageURI);
                            req.body.paymentPicURL = secure_url
                            req.body.paymentPublicPicId = public_id
                            req.body.userId = req.userData._id
                            const addedOrder = new orderModel(req.body)
                            const orderData = await addedOrder.save()
                            if (orderData) {
                                res.json({ message: "success" });
                            } else {
                                res.json({ message: "خطأ...لم يتم اضافة الاوردر الي السيرفرات الخاصة بنا حاول مره اخري" });
                            }
                        }
                    } else {
                        res.json({ message: "كود الخصم معطل في الوقت الحالي" });
                        fs.unlinkSync(req.file.path);
                    }
                } else {
                    res.json({ message: "كود الخصم خاطئ" });
                    fs.unlinkSync(req.file.path);
                }
            } else {
                const imageURI = req.file.path;
                const { secure_url, public_id } = await cloudinary.uploader.upload(imageURI, { folder: 'paymentPic', resource_type: "image", quality: 50 });
                fs.unlinkSync(imageURI);
                req.body.paymentPicURL = secure_url
                req.body.paymentPublicPicId = public_id
                req.body.userId = req.userData._id
                const addedOrder = new orderModel(req.body)
                const orderData = await addedOrder.save()
                if (orderData) {
                    res.json({ message: "success" });
                } else {
                    res.json({ message: "خطأ...لم يتم اضافة الاوردر الي السيرفرات الخاصة بنا حاول مره اخري" });
                }
            }
        } else {
            res.json({ message: 'من فضلك قم برفع الصوره الخاصة باتمام بعملية الدفع' });
        }

    } catch (error) {
        res.json({ message: error.message })
    }
}

module.exports = addOrder