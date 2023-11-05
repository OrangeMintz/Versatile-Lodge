const mongoose = require('mongoose');

const transactionschema = new mongoose.Schema({
    guest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
    },

    //remove if not needed
    guestName: {
      type: String,
      required: true,
    },
    //remove if not needed

    roomID: {
      type: String,
      required: true,
    },

    roomNumber: {
      type: String,
      required: true,
    },

    checkInDate: {
      type: Date,
      required: true,
    },

    checkOutDate: {
      type: Date,
      required: true,
    },

    isConfirmed: {
      type: Boolean,
      default: false,
    },
},
    {timestamps: true}
);

module.exports = mongoose.model('Transaction', transactionschema);