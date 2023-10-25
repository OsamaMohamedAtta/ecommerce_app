const userModel = require('../../../../DB/models/user.model')
const jwt = require('jsonwebtoken');
const sendEmail = require('../../../services/sendEmail')
const bcrypt = require('bcrypt');

const signUp = async (req, res) => {
    try {
        const { email, password, cPassword } = req.body
        const findUser = await userModel.findOne({ email })
        if (findUser) {
            res.json({ message: 'لقد تم التسجيل بهذا البريد الالكتروني بالفعل' })
        } else {
            if (password == cPassword) {
                const hashPassword = bcrypt.hashSync(password, parseInt(process.env.SALTROUNDS))
                req.body.password = hashPassword
                const addUser = new userModel(req.body)
                const userData = await addUser.save()
                if (userData) {
                    const userToken = jwt.sign({ email: userData.email }, process.env.TOKEN_SECRET_KEY);
                    const emailMessage = ` <div style="direction: rtl; padding: 10px 30px;">
                <img src="https://logos-world.net/wp-content/uploads/2020/04/Adidas-Logo.png" style="margin: 20px 0px;" width="200px" alt="brand-logo"><br>
                <p style="font-size: 20px; font-weight: bold; color: #000;">اهلا بك ${userData.userName} يسعدنا انك قومت بالتسجيل معنا يجب عليك توثيق الحساب الخاص بك عن طريق الضغط علي توثيق الان</p><br>
                <a href="http://localhost:3000/confirmed/${userToken}" style="background-color: rgb(2, 141, 2); padding: 15px 50px; border-radius: 5px; color: #fff; font-size: 20px; text-decoration: none; margin-bottom: 20px;">توثيق الان</a>
            </div>`
                    sendEmail(userData.email, emailMessage, 'توثيق الحساب', "E-commerce")
                    res.json({ message: 'success' })
                } else {
                    res.json({ message: 'خطأ...لم يتم تسجيل هذا المستخدم الي السيرفرات الخاصة بنا برجاء المحاولة مرة اخري' })
                }
            } else {
                res.json({ message: 'كلمة السر غير متطابقة معا اعادة كمة السر' })
            }
        }
    } catch (error) {
        res.json({ message: error.message })
    }
}

module.exports = signUp