const mongoose = require('mongoose')
const { Schema } = mongoose

const roomSchema2 = new Schema({
    name: {
        type: String,
        required: true,
    },

    branch: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    maxPeople: {
        type: Number,
        required: true,
    },

    desc: {
        type: String,
        required: true,
    },

    imageurls: {
        type: [String],
        required: true,
    },

    currentbookings: [
        {
            bookingid: String,
            tempDate: String,
            fromDate: String,
            toDate: String,
            userId: String,
            status: String,
            totalAmount: String,
            bookedBy: String,
            transactionId: String,
            isManual: Boolean

        },
    ],

    unavailable: {
        type: Boolean,
    },

    isArchive: {
        type: Boolean,
    },

},
    { timestamps: true }
);


const RoomModel2 = mongoose.model('Room2', roomSchema2)
module.exports = RoomModel2;
