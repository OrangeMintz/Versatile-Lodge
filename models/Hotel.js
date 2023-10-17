const mongoose = require('mongoose');

const hotelschema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    distance:{
        type: String,
        required: true
    },
    photo:{
        type: [String],
    },
    description:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        min: 0,
        max: 5
    },
    cheapestPrice:{
        type: Number,
        required: true
    },
    featured:{
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Hotel', hotelschema);