const User = require('../models/users')
const nodemailer = require('nodemailer');
// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.APP_MAILID,
        pass: process.env.APP_MAIL_PASSWORD
    }
});

// Send OTP
const sendOTP = (email, otp) => {
    const mailOptions = {
        from: 'gogreen2226@gmail.com',
        to: email,
        subject: 'Your OTP Code for GoGreen',
        text: `Your OTP code is ${otp}`
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

module.exports = {sendOTP}