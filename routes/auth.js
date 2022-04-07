const router = require('express').Router()
const {signIn,signUp,fetchUsers} = require('../controllers/auth')

router.post('/sign-in',signIn)
router.post('/sign-up', signUp)
router.get('/users',fetchUsers)
// router.post('/jwt-refresh-token', refreshToken)

module.exports = router;