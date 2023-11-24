const express = require('express');
const { createBookingHistory, deleteBookHistory, getBookHistory, getBookHistoryByUserId, updateBookingHistory } = require('../controllers/bookHistoryContr.js');

const BookingHistory = require("../models/BookingHistory.js");
// const { verifyAdmin, verifyUser } = require('../utils/verifyToken.js');

const router = express.Router();

//Create
router.post("/", createBookingHistory);

//Update
router.put("/:id", updateBookingHistory);

//Delete
router.delete("/:id", deleteBookHistory);

//GetAll
router.get("/", getBookHistory);

router.get("/:id", getBookHistoryByUserId);


module.exports = router;