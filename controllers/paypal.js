const paypal = require('paypal-rest-sdk');
const travels = require('../models/travels')

const payment = async (req, res) => {
    const { price, from,userId,time,bike } = req.body;
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "https://bikes-rent.herokuapp.com/api/payments/payment-succeed",
            "cancel_url": "https://bikes-rent.herokuapp.com/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "travelroute",
                    "sku": "sinza",
                    "price": price,
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": price
            },
            "description": "This is the payment description."
        }]
    };
    
    
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            for (let index = 0; index < payment.links.length; index++) {
            //Redirect user to this endpoint for redirect url
                if (payment.links[index].rel === 'approval_url') {
                    // res.redirect(payment.links[index].href);
                    res.status(201).json(payment.links[index].href + `/`)
                }
            }
        }
    });
    try {
        const newTravel = new travels({
            from:"62603059ac49b39be4e0a9ae",
            traveller: userId,
            time,
            price,
            bike
        })
        await newTravel.save()
    } catch (error) {
        res.status(400).json({
            error:error.message
        })
    }
}

const succeed = async (req, res) => {
    const payerId = req.query.PayerID
    const paymentId = req.query.paymentId
    // execute
    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "2.00"
            }
        }]
    };
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log("Get Payment Response");
            res.redirect('https://bikesrenting.netlify.app/travels/')
        }
    });
}

module.exports = { payment, succeed };