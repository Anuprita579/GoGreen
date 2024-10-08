const mongoose = require('mongoose');

const bicycleSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        required: true,
        default: true
    },
    pricePerKm: {
        type: Number,
        required: true
    },
    bicycleLogo: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Bicycle', bicycleSchema);

