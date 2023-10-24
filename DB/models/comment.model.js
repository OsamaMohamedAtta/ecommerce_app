const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    comment: {
        type: String,
        required: [true, 'تعليق المستخدم مطلوب'],
    },
})

const commentModel = mongoose.model('comment', commentSchema)
module.exports = commentModel