const mongoose = require('mongoose')
const { Schema } = mongoose

const roomSchema2 = new Schema({
    name: {
        type: String,
    },

    branch: {
        type: String,
    },

    price: {
        type: Number,
    },

    maxPeople: {
        type: Number,
    },

    desc: {
        type: String,
    },

    imageurls: {
        type: String,
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
