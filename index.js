const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const cors = require('cors')
require('dotenv').config()

// routes
const userRoutes = require('./routes/auth')
const bikesRoutes = require('./routes/bicycle')
const locationRoutes = require('./routes/location')
const travelRoutes = require('./routes/travels')

const app = express()

app.use(bodyParser.json({limit: '30mb', extended:true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended:true}))
app.use(cors(),express.json())

app.get('/', (req, res) => {
    res.send("project-maps api")
})
//routes middleware
app.use('/api/auth', userRoutes)
app.use('/api/bikes', bikesRoutes)
app.use('/api/location', locationRoutes)
app.use('/api/travels',travelRoutes)

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`server running on port 8800...`)
    })
}).catch((error) => console.log(error))