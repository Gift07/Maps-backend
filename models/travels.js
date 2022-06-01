const mongoose = require('mongoose')

const travelsSchema = mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"location"
    },
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
        type: Number,
    }
},
    {timestamps:true}
)

module.exports = mongoose.model('travels',travelsSchema)