const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const User = require('../models/users');
const {sendOTP} = require ('../controllers/user')

router.route('/signup').post((req, res) => {
    let { name, email } = req.body;
    name = name.trim();
    email = email.trim();

    if (name === "" || email === "") {
        return res.json({ 
            status: "FAILED", 
            message: "Empty input fields" 
        });
    } 
    else if (!/^[a-zA-Z ]*$/.test(name)) {
        return res.json({ 
            status: "FAILED", 
            message: "Invalid name entered" 
        });
    } 
    else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        return res.json({ 
            status: "FAILED", 
            message: "Invalid email entered" 
        });
    } else {
        // Generate OTP
        const otp = crypto.randomInt(1000, 9999).toString();
        const expiresAt = Date.now() + 3600000; // OTP expires in 1 hour

        User.findOneAndUpdate(
            { email },
            { name, email, otp, expiresAt },
            { upsert: true, new: true }
        )
        .then(user => {
            sendOTP(email, otp);
            res.json({ status: "SUCCESS", message: "OTP sent to email", data: { userId: user._id } });
        })
        .catch(err => {
            console.log(err);
            res.json({ status: "FAILED", message: "An error occurred" });
        });
    }
});

router.route('/verifyOTP').post((req, res) => {
    let { userId, otp } = req.body;
    User.findById(userId)
    .then(user => {
        if (!user) {
            return res.json({ status: "FAILED", message: "User not found" });
        }
        if (user.expiresAt < Date.now()) {
            return res.json({ status: "FAILED", message: "OTP has expired" });
        }
        if (user.otp !== otp) {
            return res.json({ status: "FAILED", message: "Invalid OTP" });
        }

        // OTP is valid
        user.otp = null;
        user.expiresAt = null;
        user.save()
        .then(() => res.json({ status: "SUCCESS", message: "OTP verified successfully" }))
        .catch(err => {
            console.log(err);
            res.json({ status: "FAILED", message: "An error occurred" });
        });
    })
    .catch(err => {
        console.log(err);
        res.json({ status: "FAILED", message: "An error occurred" });
    });
});


module.exports = router;
