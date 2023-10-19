const mongoose = require('mongoose');

const roomschema = new mongoose.Schema({
    
    price:{
        type: Number,
        required: true
    },

    maxPeople:{
        type: Number,
        required: true
    },

    desc:{
        type: String,
        required: true
    },

    roomNumbers: [
        {number: Number}, 
        {unavailableDates: {type: [Date]}}
    ]

    
},
    {timestamps: true}
);

module.exports = mongoose.model('Room', roomschema);