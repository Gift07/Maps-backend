const router = require('express').Router()
const { addBicycle, fetchBikes, fetchBikeId } = require('../controllers/bicyle')

router.post('/', addBicycle)
router.get('/', fetchBikes)
router.get('/:id', fetchBikeId)

module.exports = router