const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({

    room: {
        type: String,
    },

    room_id: {
        type: mongoose.Schema.Types.ObjectId,
    },

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
    },

    branch: {
        type: String,
    },

    fromDate: {
        type: String,
    },

    toDate: {
        type: String,
    },

    totalAmount: {
        type: Number,
    },

    totalDays: {
        type: Number,
    },

    //Remove if not needed
    transactionId: {
    },
    //Remove if not needed

    status: {
        type: String,
        default: 'reserved'
    },

    isManual: Boolean

},
    { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);