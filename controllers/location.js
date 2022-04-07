const location = require('../models/location')
const bikes = require('../models/bicyle')

const createLocation = async (req, res) => {
    const { owner, name, area, imageUrl } = req.body;
    console.log(req.body)
    try {
        const newLocation = new location({
            owner,
            name,
            area,
            imageUrl
        })
        console.log(newLocation)
        await newLocation.save()
        res.status(201).json({
            message: "new rental location created successful",
            data:newLocation
        })
    } catch (error) {
        res.status(409).json({
            error:error.message
        })
    }
}

const fetchLocation = async (req, res) => {
    try {
        const  data  = await location.find()
        res.status(200).json({
            data
        })
    } catch (error) {
        res.status(400).json({
            error:error.message
        })
    }
}

const fetchLocationId = async (req, res) => {
    try {
        const {id} = req.params 
        await location.findById(id)
        .then(data =>{
              bikes.find({location:id}).populate('owner')
             .exec((err,bike)=>{
                 if(err){
                     return res.status(422).json({error:err})
                 }
                 res.json({data,bike})
             })
     })
    } catch (error) {
        res.status(404).json({message:error})
    }
}

module.exports = { createLocation, fetchLocation, fetchLocationId };