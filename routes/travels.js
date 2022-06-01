const router = require("express").Router()
const { addTravel, fetchTravels,endRoute } = require('../controllers/travels')

router.post('/', addTravel)
router.get('/', fetchTravels)
router.post('/:id',endRoute)

module.exports = router;