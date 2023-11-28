const mongoose = require("mongoose");

const archiveRoomschema = new mongoose.Schema(
    {
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

        imageurls: [],

        currentbookings: [
            {
                bookingid: String,
                tempDate: String,
                fromDate: String,
                toDate: String,
                userId: String,
                status: String,
                totalAmount: String,
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

module.exports = mongoose.model("ArchiveRooms", archiveRoomschema);
