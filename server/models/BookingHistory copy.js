const mongoose = require('mongoose');

const bookhistoryschema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  reservationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
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
  bookingDate: {
    type: Date,
    default: Date.now,
  },

  roomName: {
    type: 'String'
  },

  price: {
    type: 'String'
  }
},
  { timestamps: true }
);

module.exports = mongoose.model('BookingHistory', bookhistoryschema);