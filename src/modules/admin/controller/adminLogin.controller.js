const adminModel = require('../../../../DB/models/admin.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const findAdmin = await adminModel.findOne({ email })
        if (findAdmin) {
            const checkPassword = bcrypt.compareSync(password, findAdmin.password)
            if (checkPassword) {
                if (!findAdmin.block) {
                    const adminToken = jwt.sign({ id: findAdmin._id }, process.env.TOKEN_SECRET_KEY);
                    res.json({ message: 'success', adminToken })
                } else {
                    res.json({ message: 'لا يمكنك اتمام عملية تسجيل الدخول لقد تم حذف هذا الحساب بشكل نهائي' })
                }
            } else {
                res.json({ message: 'كلمة السر خاطئة' })
            }
        } else {
            res.json({ message: 'البريد الالكتروني خاطئ لا يوجد لدنيا حساب يحمل هذا البريد الالكتروني' })
        }
    } catch (error) {
        res.json({ message: error.message })
    }
}

module.exports = adminLogin