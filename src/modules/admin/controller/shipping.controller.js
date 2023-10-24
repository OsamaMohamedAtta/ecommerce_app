const shippingModel = require('../../../../DB/models/shipping.model')
const freeShippingModel = require('../../../../DB/models/freeShipping.model')

const addShipping = async (req, res) => {
    try {
        const { cityName } = req.body
        const findCity = await shippingModel.findOne({ cityName })
        if (findCity) {
            res.json({ message: 'لقد تم اضافة هذه المدينة من قبل' })
        } else {
            const addCity = new shippingModel(req.body)
            await addCity.save()
            res.json({ message: 'success' });
        }
    } catch (error) {
        res.json({ message: error.message })
    }
}

const updateFreeShipping = async (req, res) => {
    try {
        const { checkFreeShipping } = req.params
        const freeShipping = await freeShippingModel.findOne({ title: checkFreeShipping })
        if (freeShipping) {
            if (!freeShipping.freeShipping) {
                freeShipping.freeShipping = true
                await freeShipping.save()
                res.json({ message: 'success' });
            } else {
                freeShipping.freeShipping = false
                await freeShipping.save()
                res.json({ message: 'success' });
            }
        } else {
            res.json({ message: 'لم يتم اضافة هذة الميزة من قبل المطور' })
        }
    } catch (error) {
        res.json({ message: error.message })
    }
}

module.exports = { addShipping, updateFreeShipping }