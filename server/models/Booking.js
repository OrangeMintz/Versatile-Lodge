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

    branch: {
        type: String,
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

    //Remove if not needed
    transactionId: {
        type: String,
    },
    //Remove if not needed

    status: {
        type: String,
        required: true,
        default: 'reserved'
    },

},
    { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);