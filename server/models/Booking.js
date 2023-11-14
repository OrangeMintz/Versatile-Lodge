const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({

    room: {
        type: String,
        required: true
    },

    room_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    fromDate: {
        type: String,
        required: true
    },

    toDate: {
        type: String,
        required: true
    },

    totalAmount: {
        type: Number,
        required: true
    },

    totalDays: {
        type: Number,
        required: true
    },

    transaction_id: {
        type: String,
    },

    status: {
        type: String,
        required: true,
        default: 'booked'
    },

},
    { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);