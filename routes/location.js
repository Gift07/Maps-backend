const router = require('express').Router()
const { createLocation, fetchLocation, fetchLocationId } = require('../controllers/location')

router.post('/', createLocation)
router.get('/', fetchLocation)
router.get('/:id', fetchLocationId)

module.exports = router;