const mongoose = require('mongoose')

const travelsSchema = mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"location"
    },
    time:Number,
    traveller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    ended: {type:Boolean, default:false},
    bike: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"bicycle"
    },
    price: {
        type: String,
        required: true
    }
},
    {timestamps:true}
)

module.exports = mongoose.model('travels',travelsSchema)