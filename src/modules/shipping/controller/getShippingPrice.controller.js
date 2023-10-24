const shippingModel = require('../../../../DB/models/shipping.model')

const getShippingPrice = async (req, res) => {
    try {
        const { cityName } = req.params
        const findCity = await shippingModel.findOne({ cityName })
        if(findCity){
            res.json({ message: 'success', shippingPrice: findCity.shippingPrice });
        }else{
            res.json({ message: 'لا يتم عملية توصيل الي هذه المدينة' })
        }
    } catch (error) {
        res.json({ message: error.message })
    }
}

module.exports = getShippingPrice