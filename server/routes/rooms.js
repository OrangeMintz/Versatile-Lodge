const express = require('express');
const { createRoom, deleteRoom, updateRoom, getRoom, getRooms, confirmBooking, removeOverlappingBookings, rejectBooking } = require('../controllers/roomContr.js');

const Room = require("../models/Room.js");
const { verifyAdmin, verifyUser } = require('../utils/verifyToken.js');

//const createError = require('../utils/error.js');

const router = express.Router();

router.put('/:roomId/confirmBooking/:bookingId', confirmBooking);

router.put('/:roomId/removeOverlappingBookings', removeOverlappingBookings);

router.put('/:roomId/rejectBooking/:bookingId', rejectBooking);


//Delete
// router.delete("/:id", verifyAdmin, deleteRoom);
router.delete("/:id", verifyAdmin, deleteRoom);

//Update
router.put("/:id", updateRoom)

//Get
router.get("/:id", getRoom);

//GetAll
router.get("/", getRooms);

//Create
// router.post("/", createRoom);
router.post("/", verifyAdmin, createRoom);




module.exports = router;