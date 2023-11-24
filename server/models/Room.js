const mongoose = require("mongoose");

const roomschema = new mongoose.Schema(
    {
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

        imageurls: [],

        currentbookings: [
            {
                bookingid: String,
                fromDate: String,
                toDate: String,
                userId: String,
                status: String,
            },
        ],

        // currentbookings: [],

        unavailable: {
            type: Boolean,
        },

        isArchive: {
            type: Boolean,
        },

        // remove if not needed
        // roomNumbers: [{ number: Number }, { unavailableDates: { type: [Date] } }],
        // remove if not needed
    },
    { timestamps: true }
);

module.exports = mongoose.model("Room", roomschema);
