const express = require('express');
const { createRoom, deleteRoom, updateRoom, getRoom, getRooms, confirmBooking, removeOverlappingBookings, rejectBooking, deleteBooking, archiveRoom } = require('../controllers/roomContr.js');

const { verifyAdmin, verifyUser } = require('../utils/verifyToken.js');

const router = express.Router();

// Delete Room Booking
router.delete('/:roomId/booking/:bookingId', verifyUser, deleteBooking);

// Confirm Room Reservation
router.put('/:roomId/confirmBooking/:bookingId', verifyUser, confirmBooking);

// Remove Room Reservation
router.put('/:roomId/removeOverlappingBookings', verifyUser, removeOverlappingBookings);

// Reject Room Reservation
router.put('/:roomId/rejectBooking/:bookingId', verifyUser, rejectBooking);

//Archive 
router.post("/archive", verifyAdmin, archiveRoom);

//Update
router.put("/:id", verifyUser, updateRoom)

//Delete
router.delete("/:id", verifyAdmin, deleteRoom);

//Get Specific
router.get("/:id", getRoom);

//GetAll
router.get("/", getRooms);

//Create
router.post("/", verifyAdmin, createRoom);

module.exports = router;