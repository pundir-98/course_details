const mongoose = require('mongoose')


const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    subscribeDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Course',courseSchema)