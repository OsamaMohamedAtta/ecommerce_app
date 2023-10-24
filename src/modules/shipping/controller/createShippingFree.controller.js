const freeShippingModel = require('../../../../DB/models/freeShipping.model')

const createShippingFree = async (req, res) => {
    try {
        const addFreeShippingModel = new freeShippingModel(req.body)
        await addFreeShippingModel.save()
        res.json({ message: 'success' })
    } catch (error) {
        res.json({ message: error.message })
    }
}

module.exports = createShippingFree