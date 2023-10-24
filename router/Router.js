const authRouter = require('../src/modules/auth/auth.routes')
const userRouter = require('../src/modules/user/user.routes')
const adminRouter = require('../src/modules/admin/admin.routes')
const productRouter = require('../src/modules/product/product.routes')
const cartRouter = require('../src/modules/cart/cart.routes')
const shippingRouter = require('../src/modules/shipping/shipping.routes')
const categoryRouter = require('../src/modules/category/category.routes')
const orderRouter = require('../src/modules/order/order.routes')

module.exports = {authRouter, userRouter, adminRouter, productRouter, cartRouter, shippingRouter, categoryRouter, orderRouter}