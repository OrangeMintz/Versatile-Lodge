const mongoose = require('mongoose');

const transactionschema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
  },

  //remove if not needed
  guestName: {
    type: String,
  },
  //remove if not needed

  //remove if not needed
  // roomID: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Room',
  // },
  //remove if not needed

  roomname: {
    type: String,
    required: true,
  },

  branch: {
    type: String,
    required: true
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
  { timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionschema);