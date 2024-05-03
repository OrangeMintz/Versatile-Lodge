const mongoose = require('mongoose')
const { Schema } = mongoose

const roomSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
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

    imageurls: [String],

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


const RoomModel = mongoose.model('Room', roomSchema)
module.exports = RoomModel;
