const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const cors = require('cors')
const paypal = require('paypal-rest-sdk');
require('dotenv').config()

// routes
const userRoutes = require('./routes/auth')
const bikesRoutes = require('./routes/bicycle')
const locationRoutes = require('./routes/location')
const travelRoutes = require('./routes/travels')
const paypalRoutes = require('./routes/paypal')

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
app.use('/api/travels', travelRoutes)
app.use('/api/payments',paypalRoutes)

// paypal setup
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AQsqmqXslP6R5x2RsFncwdjMykrBuYGPs01i-ye9jlMyVVGmd3O_6pEKY-pfR3cKV4gAoPledEuiz608',
    'client_secret': 'ELWf-2-znqEmCqP3g-4ECRw3dcJarWKGtT9IQRgGk8WTQqQHDiQmuGd0O1VZ4-JIjtT7Jbv1vn1vitUK'
});

// mongodb connection route
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`server running on port 8800...`)
    })
}).catch((error) => console.log(error))