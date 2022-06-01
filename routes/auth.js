const router = require('express').Router()
const {signIn,signUp,fetchUsers, setPhotographer,verifyEmail} = require('../controllers/auth')

router.post('/sign-in',signIn)
router.post('/sign-up', signUp)
router.get('/verify-email',verifyEmail)
router.post('/set-staff',setPhotographer)
router.get('/users',fetchUsers)
// router.post('/jwt-refresh-token', refreshToken)

module.exports = router;