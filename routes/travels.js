const router = require("express").Router()
const { addTravel, fetchTravels } = require('../controllers/travels')

router.post('/', addTravel)
router.get('/', fetchTravels)

module.exports = router;