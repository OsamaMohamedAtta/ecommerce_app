const adminModel = require('../../../../DB/models/admin.model')
const bcrypt = require('bcrypt');

const createAdminAccount = async (req, res) => {
    try {
        const { email, password } = req.body
        const findAdmin = await adminModel.findOne({ email })
        if (findAdmin) {
            res.json({ message: 'تم التسجيل بواسطة هذا البريد الالكتروني من قبل' })
        } else {
            const hashPassword = bcrypt.hashSync(password, parseInt(process.env.SALTROUNDS))
            req.body.password = hashPassword
            const addAdmin = new adminModel(req.body)
            const adminData = await addAdmin.save()
            if (adminData) {
                res.json({ message: 'success' })
            } else {
                res.json({ message: 'خطأ...لم يتم تسجيل هذا الادمن الي السيرفرات الخاصة بنا برجاء المحاولة مرة اخري' })
            }
        }
    } catch (error) {
        res.json({ message: error.message })
    }
}

module.exports = createAdminAccount