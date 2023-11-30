const mongoose = require('mongoose');

const reviewsschema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    comment: {
        type: String,
        required: true
    },

    replies: [
        {
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
            },
            user_name: {
                type: String,
                required: true,
            },
            user_image: {
                type: String,
                required: true,
            },
            reply: {
                type: String,
                required: true,
            },
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ],

    date: {
        type: Date,
        required: true
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Reviews', reviewsschema);