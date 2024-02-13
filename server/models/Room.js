const mongoose = require("mongoose");

const roomschema = new mongoose.Schema(
    {
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

module.exports = mongoose.model("Room", roomschema);
