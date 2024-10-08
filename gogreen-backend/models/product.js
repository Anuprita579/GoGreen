const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        // required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['clothes', 'homeDecor', 'luggage', 'stationary', 'plants']
    },
    price: {
        type: Number,
        required: [true, "Price must be provided"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    inStock: {
        type: Boolean,
        default: true
    },
    description: {
        type: String,
        required: true
    },
    //Optional Fields
    color: {
        type: String,
        enum: {
            values: ["violet", "indigo", "blue", "green", "yellow", "orange", "red", "black", "white", "pink"],
            message: "{VALUE} not supported"
        }
    },
    size: {
        type: String,
        enum: {
            values: ["S", "M", "L", "XL", "XXL"],
            message: "{VALUE} not supported"
        }
    },
    apparelType: {
        type: String,
        enum: {
            values: ["men", "women", "unisex", "kids"],
            message: "{VALUE} not supported"
        }
    }
})

module.exports = mongoose.model('Product', productSchema);