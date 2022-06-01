const mongoose = require('mongoose')
const role = require('../config/role')

const userSchema = mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    nationalId: { type: String, required: true },
    email: { type: String, required: true },
    emailToken: { type: String, required: true },
    is_verified: { type: Boolean, default: false },
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