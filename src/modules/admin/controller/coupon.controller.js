const couponModel = require('../../../../DB/models/coupon.model')

const addCoupon = async (req, res) => {
    try {
        const { couponCode } = req.body
        const findCoupon = await couponModel.findOne({ couponCode })
        if (findCoupon) {
            res.json({ message: 'كود الخصم هذا مسجل من قبل' })
        } else {
            const addCoupon = new couponModel(req.body)
            await addCoupon.save()
            res.json({ message: 'success' })
        }
    } catch (error) {
        res.json({ message: error.message })
    }
}

const couponWorking = async (req, res) => {
    try {
        const { couponID } = req.params
        const findCoupon = await couponModel.findById(couponID)
        if (findCoupon) {
            if (findCoupon.inWork) {
                findCoupon.inWork = false
                await findCoupon.save()
                res.json({ message: 'success' })
            } else {
                findCoupon.inWork = true
                await findCoupon.save()
                res.json({ message: 'success' })
            }
        } else {
            res.json({ message: 'كود الخصم ليس مسجل ' })
        }
    } catch (error) {
        res.json({ message: error.message })
    }
}

module.exports = { addCoupon, couponWorking }