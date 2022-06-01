const travels = require('../models/travels')

const addTravel = async (req, res) => {
    const { from, to, price, bike } = req.body;
    try {
        const newTravel = new travels({
            from,
            to,
            price,
            bike
        })
        await newTravel.save().populate('bike').populate('from')
        res.status(201).json({
            message: "route added successful",
            data:newTravel
        })
    } catch (error) {
        res.status(400).json({
            error:error.message
        })
    }
}

const endRoute = async (req, res) => {
    const { id } = req.params;
    const { timeTaken,user } = req.body;
    const initialPrice = 2;
    try {
        const data = await travels.findById(id)
        data.filter(x => x.traveller.equals(user))
        data.ended = true
        data.price = Math.ceil(initialPrice * timeTaken)
        const updatedData = await travels.findByIdAndUpdate(id, data, { new: true })
        res.status(200).json(updatedData)
    } catch (error) {
        res.status(404).json(error)
    }
}

const fetchTravels = async (req, res) => {
    try {
        const data  = await travels.find().populate("bike")
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({
            error:error.message
        })
    }
}

module.exports = { addTravel, fetchTravels,endRoute };