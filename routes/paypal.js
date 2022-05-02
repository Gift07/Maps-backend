const router = require('express').Router()
const {payment,succeed} = require('../controllers/paypal')

router.post("/travel", payment)
router.get("/payment-succeed", succeed)

module.exports = router;