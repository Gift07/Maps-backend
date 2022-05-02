const router = require('express').Router()
const {signIn,signUp,fetchUsers, setPhotographer} = require('../controllers/auth')

router.post('/sign-in',signIn)
router.post('/sign-up', signUp)
router.patch('/set-staff',setPhotographer)
router.get('/users',fetchUsers)
// router.post('/jwt-refresh-token', refreshToken)

module.exports = router;