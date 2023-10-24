const userModel = require('../../DB/models/user.model')
const jwt = require('jsonwebtoken');

const userAuth = async (req, res, next) => {
    try {
        const { authrization } = req.headers;
        if (authrization) {
            if (authrization.startsWith(process.env.AUTH_SECRET_KEY)) {
                const userToken = authrization.split(process.env.AUTH_SECRET_KEY)[1]
                const { id } = jwt.verify(userToken, process.env.TOKEN_SECRET_KEY)
                const userFounded = await userModel.findById(id)
                if (userFounded) {
                    if (userFounded.verify) {
                        if (!userFounded.block) {
                            req.userData = userFounded
                            next()
                        } else {
                            res.json({ message: 'لا يمكنك تنفيذ هذه المعاملة لقد تم حذف هذا الحساب بشكل نهائي بسبب حدوث اعمال نصب واحتيال' })
                        }
                    } else {
                        res.json({ message: 'هذا الحساب غير موثق' })
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

module.exports = userAuth