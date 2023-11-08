const mongoose = require('mongoose');

const reviewsschema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    comment: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Reviews', reviewsschema);