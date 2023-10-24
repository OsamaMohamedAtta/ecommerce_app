const userModel = require('../../../../DB/models/user.model')
const jwt = require('jsonwebtoken');

const confirmed = (req, res) => {
    try {
        const { userToken } = req.params
        jwt.verify(userToken, process.env.TOKEN_SECRET_KEY, async function (err, decoded) {
            if (err) {
                res.json({ message: err.message })
            } else {
                const findUser = await userModel.findOne({ email: decoded.email })
                if (findUser) {
                    if (findUser.verify) {
                        res.json({ message: "هذا البريد الالكتروني موثق بالفعل" })
                    } else {
                        findUser.verify = true
                        await findUser.save()
                        res.json({ message: "success" })
                    }
                } else {
                    res.json({ message: "خطأ...هذا البريد الالكتروني ليس مسجل" })
                }
            }
        });
    } catch (error) {
        res.json({ message: error.message })
    }
}

module.exports = confirmed