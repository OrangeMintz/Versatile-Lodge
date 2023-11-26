const express = require('express');
const { createRoom, deleteRoom, updateRoom, getRoom, getRooms, confirmBooking, removeOverlappingBookings, rejectBooking, deleteBooking, archiveRoom } = require('../controllers/roomContr.js');

const Room = require("../models/Room.js");
const { verifyAdmin, verifyUser } = require('../utils/verifyToken.js');

//const createError = require('../utils/error.js');

const router = express.Router();


router.delete('/:roomId/booking/:bookingId', deleteBooking);

router.put('/:roomId/confirmBooking/:bookingId', confirmBooking);

router.put('/:roomId/removeOverlappingBookings', removeOverlappingBookings);

router.put('/:roomId/rejectBooking/:bookingId', rejectBooking);

router.post("/archive", verifyAdmin, archiveRoom);


//Update
router.put("/:id", updateRoom)

//Delete
// router.delete("/:id", verifyAdmin, deleteRoom);
router.delete("/:id", verifyAdmin, deleteRoom);


//Get
router.get("/:id", getRoom);

//GetAll
router.get("/", getRooms);

//Create
// router.post("/", createRoom);
router.post("/", verifyAdmin, createRoom);






module.exports = router;