var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
var bcrypt = require("bcryptjs");
var paypal = require('paypal-rest-sdk');

var parseUrlencoded = bodyParser.urlencoded({
  extended: true
});
var {
  validatepayment,
  donationpayment
} = require("../models/donationone");

router.post("/payment", parseUrlencoded, async (req, res) => {
  var {
    error
  } = validatepayment(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let donation = new donationpayment({
    donor: req.body.donor,
    email: req.body.email,
    donorcreditnum: req.body.donorcreditnum,
    country: req.body.country,
    City: req.body.City,
    PostalCode: req.body.PostalCode,
    charity: req.body.charity,
    charityBankAccount: req.body.charityBankAccount,
    amount: req.body.amount
  });
  var salt = await bcrypt.genSalt(5);
  donation.donorcreditnum = await bcrypt.hash(donation.donorcreditnum, salt);
  await donation.save();

  res.json(donation);
});


router.post("/paymentpaypal", parseUrlencoded, async (req, res) => {

  const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:4200/done",
        "cancel_url": "http://localhost:4200/donation"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "donation",
                "sku": "item",
                "price":req.body.amount,
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": req.body.amount
        },
        "description": "Donation to those people in need."
    }]
};


paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error;
    } else {
        console.log("Create Payment Response");
        for(let i = 0;i<payment.links.length;i++){

        if(payment.links[i].rel === "approval_url"){

         res.json("approval_url")

        }

        }
    }
});







})

module.exports = router;
