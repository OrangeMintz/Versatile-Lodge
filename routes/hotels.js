const express = require('express');
const { createHotel, deleteHotel, updateHotel, getHotel, getHotels} = require('../controllers/hotelContr.js');

const Hotel = require("../models/Hotel.js");

//const createError = require('../utils/error.js');

const router = express.Router();

//Create
router.post("/", createHotel);

//Delete
router.delete("/:id", deleteHotel);

//Update
router.put("/:id", updateHotel)

//Get
router.get("/:id", getHotel);

//GetAll
router.get("/", getHotels);

module.exports = router;