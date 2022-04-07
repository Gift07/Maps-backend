const bicyle = require('../models/bicyle');
const bicycle = require('../models/bicyle')

const addBicycle = async(req, res) => {
    const { owner, name,location,imageUrl } = req.body;
    try {
        const newBike = new bicycle({
            owner,
            name,
            location,
            imageUrl
        })
        await newBike.save()
        res.status(201).json({
            message: "bike added successful",
            data:newBike
        })
    } catch (error) {
        res.status(400).json({
            error:error.message
        })
    }
}

const fetchBikes = async (req, res) => {
    try {
        const data  = await bicycle.find()
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({
            error:error.message
        })
    }
}

const fetchBikeId = async(req, res) => {
    try {
        const {id} = req.params
        const item = await bicyle.findById(id);

        res.status(200).json(item)
    } catch (error) {
        res.status(404).json({
            error: error.message
        })
    }
};

module.exports = { addBicycle, fetchBikes, fetchBikeId };
