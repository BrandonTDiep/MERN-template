const mongoose = require('mongoose')

const Schema = mongoose.Schema

// mongoose will enforce this schema so the title has to be a string
const productSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)