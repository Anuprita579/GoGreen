const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    otp: String,
    createdAt: Date,
    expiresAt: Date
})
module.exports = mongoose.model('User', userSchema);