const mongoose = require('mongoose')

const bicycleShema = mongoose.Schema({
    name: {
        type: String,
        requred:true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required:true
    },
    imageUrl: {
        type: String,
        required:true
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"location"
    },
    newlocation: {
        lat: {
            type: Number,
            default:-6.862991
        },
        long: {
            type: Number,
            default: 39.223921
        }
    }
})

module.exports = mongoose.model('bicycle', bicycleShema);