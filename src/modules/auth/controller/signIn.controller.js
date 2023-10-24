const userModel = require('../../../../DB/models/user.model')
const jwt = require('jsonwebtoken');
const sendEmail = require('../../../services/sendEmail')
const bcrypt = require('bcrypt');

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body
        const findUser = await userModel.findOne({ email })
        if (findUser) {
            if (!findUser.verify) {
                const userToken = jwt.sign({ email: findUser.email }, process.env.TOKEN_SECRET_KEY);
                const emailMessage = ` <div style="direction: rtl; padding: 10px 30px;">
            <img src="https://logos-world.net/wp-content/uploads/2020/04/Adidas-Logo.png" style="margin: 20px 0px;" width="200px" alt="brand-logo"><br>
            <p style="font-size: 20px; font-weight: bold; color: #000;">اهلا بك ${findUser.userName} يسعدنا انك قومت بالتسجيل معنا يجب عليك توثيق الحساب الخاص بك عن طريق الضغط علي توثيق الان</p><br>
            <a href="http://localhost:8888/user/confirmed/${userToken}" style="background-color: rgb(2, 141, 2); padding: 15px 50px; border-radius: 5px; color: #fff; font-size: 20px; text-decoration: none; margin-bottom: 20px;">توثيق الان</a>
        </div>`
                sendEmail(findUser.email, emailMessage, 'توثيق الحساب')
                res.json({ message: 'هذا الحساب ليس موثق تفحص البريد الالكتروني الخاص بك قمنا بارسال رابط التوثيق اليك' })
            } else {
                const checkPassword = bcrypt.compareSync(password, findUser.password)
                if (checkPassword) {
                    if (!findUser.block) {
                        const userToken = jwt.sign({ id: findUser._id }, process.env.TOKEN_SECRET_KEY);
                        res.json({ message: 'success', userToken })
                    }else{
                        res.json({ message: 'لقد تم حذف هذا الحساب بشكل نهائي بسبب حدوث اعمال نصب واحتيال' })
                    }
                } else {
                    res.json({ message: 'كلمة السر خاطئة' })
                }
            }
        } else {
            res.json({ message: 'البريد الالكتروني خاطئ لا يوجد لدنيا حساب يحمل هذا البريد الالكتروني' })
        }
    } catch (error) {
        res.json({ message: error.message })
    }
}

module.exports = signIn