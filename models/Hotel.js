const { builtinModules } = require('module');
const mongoose = require('mongoose');

const hotelschema = new mongoose.Schema({
    Name:{
        type: String,
        required: true
        
    },
    Branch: {
        type: String,
        required: true
    },
    Address:{
        type: String,
        required: true
    },
    Distance:{
        type: String,
        required: true
    },
    Photo:{
        type: [String],
        required: true
    },
    Description:{
        type: String,
        required: true
    },
    Rating:{
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