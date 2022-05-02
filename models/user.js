const mongoose = require('mongoose')
const role = require('../config/role')

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    location: { 
        lat: { type: Number, default: -6 },
        lng:{ type: Number, default:31}
    },
    userRole: { type: String, default: role.NORMALUSER },
},
    { timestamps: true }
)

module.exports = mongoose.model('user',userSchema)