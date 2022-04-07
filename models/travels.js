const mongoose = require('mongoose')

const travelsSchema = mongoose.Schema({
    from: {
        name: String,
        lat: Number,
        long:Number
    },
    to: {
        name: String,
        lat: Number,
        long:Number
    },
    bike: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"bicycle"
    },
    price: {
        type: Number,
        default: 0
    }
},
    {timestamps:true}
)

module.exports = mongoose.model('travels',travelsSchema)