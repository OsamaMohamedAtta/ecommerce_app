const mongoose = require('mongoose')

const connectionDB = () => {
    return mongoose.connect(process.env.CONNECTION_DB_LIVE).then(() => console.log('connection db is runing....')).catch(err => console.log('error in connection db', err))
}

module.exports = connectionDB