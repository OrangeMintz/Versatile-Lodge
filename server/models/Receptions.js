const mongoose = require('mongoose');

const receptionsschemma = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
    },

    name: {
        type: String,
    },

    role: {
        type: String,
    },

    image: {
        type: String,
    },

    phoneNumber: {
        type: String
    },

    branch: {
        type: String,
    },

    totalTransactions: {
        type: Number,
    },

},
    { timestamps: true }
);

module.exports = mongoose.model('Reception', receptionsschemma);