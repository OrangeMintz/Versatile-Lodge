const express = require('express');
const { createBookHistory, deleteBookHistory, getBookHistory } = require('../controllers/bookHistoryContr.js');

const BookingHistory = require("../models/BookingHistory.js");
// const { verifyAdmin, verifyUser } = require('../utils/verifyToken.js');

const router = express.Router();

//Create
router.post("/", createBookHistory);

//Delete
router.delete("/:id", deleteBookHistory);

//GetAll
router.get("/", getBookHistory);

module.exports = router;