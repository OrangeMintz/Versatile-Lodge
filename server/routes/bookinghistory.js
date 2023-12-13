const express = require('express');
const { createBookingHistory, deleteBookHistory, getBookHistory, getBookHistoryByUserId, updateBookingHistory, acceptBooking, updateStatus, rejectBooking } = require('../controllers/bookHistoryContr.js');

const router = express.Router();

router.put("/updateStatus", updateStatus);
router.put("/rejectBooking", rejectBooking);
router.put("/:userId/acceptBooking/:bookingId", acceptBooking);

//Update
router.put("/:id", updateBookingHistory);

//Delete
router.delete("/:id", deleteBookHistory);

//Get Specific
router.get("/:id", getBookHistoryByUserId);

//Create
router.post("/", createBookingHistory);

//Get All
router.get("/", getBookHistory);

module.exports = router;