const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
app.use(cors())
app.use(express.json())
const connectionDB = require('./DB/connection')
connectionDB()
const {authRouter, userRouter, adminRouter, productRouter, cartRouter, shippingRouter, categoryRouter, orderRouter} = require('./router/Router')
app.use(authRouter, userRouter, adminRouter, productRouter, cartRouter, shippingRouter, categoryRouter, orderRouter)
const port = process.env.PORT || 3000

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))