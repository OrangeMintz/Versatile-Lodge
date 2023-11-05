const mongoose = require('mongoose');

const reviewsschema = new mongoose.Schema({

    name: {
        type: Number,
        required: true
    },

    comment: {
        type: String,
        required: true
    },

    date: {
        type: String,
        required: true
    }

},
    { timestamps: true }
);

module.exports = mongoose.model('Reviews', reviewsschema);