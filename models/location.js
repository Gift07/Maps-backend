const mongoose = require('mongoose')

const locationSchema = mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    imageUrl: {
        type: String,
        required:true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    area: {
        lat:{
            type: Number,
            default: 32,
        }, 
      long: {
          type: Number,
          default:106
      }  
    },
    is_available: {
        type: Boolean,
        default:true
    }
})

module.exports = mongoose.model('location', locationSchema)