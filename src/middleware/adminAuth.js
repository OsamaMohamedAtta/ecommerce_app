const adminModel = require('../../DB/models/admin.model')
const jwt = require('jsonwebtoken');

const adminAuth = async (req, res, next) => {
    try {
        const { authrization } = req.headers;
        if (authrization) {
            if (authrization.startsWith(process.env.AUTH_SECRET_KEY)) {
                const adminToken = authrization.split(process.env.AUTH_SECRET_KEY)[1]
                const { id } = jwt.verify(adminToken, process.env.TOKEN_SECRET_KEY)
                const adminFounded = await adminModel.findById(id)
                if (adminFounded) {
                    if (!adminFounded.block) {
                        next()
                    } else {
                        res.json({ message: 'لا يمكنك تنفيذ هذه المعاملة لقد تم حذف هذا الحساب بشكل نهائي' })
                    }

                } else {
                    res.json({ message: 'البريد الالكتروني خاطئ لا يوجد لدنيا حساب يحمل هذا البريد الالكتروني' })
                }
            } else {
                res.json({ message: 'كلمة السر غير صحيحة' })
            }
        } else {
            res.json({ message: 'لا وجود لمعلومات هذا الحساب' })
        }
    } catch (error) {
        res.json({ message: error.message })
    }
}

module.exports = adminAuth