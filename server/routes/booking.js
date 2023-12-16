const express = require('express');
const { createBooking, deleteBooking, getBooking, getSpecificBooking } = require('../controllers/bookingContr.js');
const { verifyAdmin, verifyUser } = require('../utils/verifyToken.js');

const router = express.Router();

//Create
router.post("/", createBooking);

//Delete
router.delete("/:id", deleteBooking);

//Get All
router.get("/", getBooking);

//Get Specific
router.get("/:id", getSpecificBooking);

module.exports = router;