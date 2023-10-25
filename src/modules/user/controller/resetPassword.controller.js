const userModel = require("../../../../DB/models/user.model")
const jwt = require('jsonwebtoken');
const sendEmail = require('../../../services/sendEmail')
const bcrypt = require('bcrypt');

const senderResetPassword = async (req, res) => {
    try {
        const { email } = req.params
        const findUser = await userModel.findOne({ email })
        if (findUser) {
            if (!findUser.block) {
                const userToken = jwt.sign({ email: findUser.email }, process.env.TOKEN_SECRET_KEY);
                const emailMessage = ` <div style="direction: rtl; padding: 10px 30px;">
            <img src="https://logos-world.net/wp-content/uploads/2020/04/Adidas-Logo.png" style="margin: 20px 0px;" width="200px" alt="brand-logo"><br>
            <p style="font-size: 20px; font-weight: bold; color: #000;">اهلا بك ${findUser.userName} لقد قومت بتقديم طلب تغيير كلمة السر لاستكمال العملية برجاء الضغط علي تغيير كلمة السر</p><br>
            <a href="http://localhost:3000/resetPassword/${userToken}" style="background-color: rgb(2, 141, 2); padding: 15px 50px; border-radius: 5px; color: #fff; font-size: 20px; text-decoration: none; margin-bottom: 20px;">تغيير كلمة السر</a>
        </div>`
                sendEmail(findUser.email, emailMessage, 'اعادة تعيين كلمة السر', "E-commerce")
                res.json({ message: 'success' });
            } else {
                res.json({ message: 'لا يمكنك تنفيذ هذه المعاملة لقد تم حذف هذا الحساب بشكل نهائي بسبب حدوث اعمال نصب واحتيال' })
            }
        } else {
            res.json({ message: 'البريد الالكتروني خاطئ لا يوجد لدنيا حساب يحمل هذا البريد الالكتروني' })
        }
    } catch (error) {
        res.json({ message: error.message })
    }
}

const resetPassword = (req, res) => {
    try {
        const { userToken } = req.params
        const { password, cPassword } = req.body
        jwt.verify(userToken, process.env.TOKEN_SECRET_KEY, async function (err, decoded) {
            if (err) {
                res.json({ message: err.message })
            } else {
                const findUser = await userModel.findOne({ email: decoded.email })
                if (findUser) {
                    if(!findUser.block){
                        if (password == cPassword) {
                            const hashPassword = bcrypt.hashSync(password, parseInt(process.env.SALTROUNDS))
                            findUser.password = hashPassword
                            await findUser.save()
                            res.json({ message: 'success' });
                        } else {
                            res.json({ message: 'كلمة السر غير متطابقة معا اعادة كمة السر' })
                        }
                    }else{
                        res.json({ message: 'لا يمكنك تنفيذ هذه المعاملة لقد تم حذف هذا الحساب بشكل نهائي بسبب حدوث اعمال نصب واحتيال' })
                    }
                } else {
                    res.json({ message: 'البريد الالكتروني خاطئ لا يوجد لدنيا حساب يحمل هذا البريد الالكتروني' })
                }
            }
        });
    } catch (error) {
        res.json({ message: error.message })
    }
}


module.exports = { resetPassword, senderResetPassword }