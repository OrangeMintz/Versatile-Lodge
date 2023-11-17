const mongoose = require('mongoose');

const bookingHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer', // Assuming you have a Customer model
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
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'Pending', // Initial status, you can update it accordingly
  },
}, { timestamps: true });

module.exports = mongoose.model('BookingHistory', bookingHistorySchema);