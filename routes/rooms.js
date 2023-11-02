const express = require('express');
const { createRoom, deleteRoom, updateRoom, getRoom, getRooms} = require('../controllers/roomContr.js');

const Room = require("../models/Room.js");
const { verifyAdmin, verifyUser } = require('../utils/verifyToken.js');

//const createError = require('../utils/error.js');

const router = express.Router();

//Create
router.post("/:branchId", createRoom);

//Delete
router.delete("/:id/:branchId", verifyAdmin, deleteRoom);

//Update
router.put("/:id", verifyAdmin, updateRoom)

//Get
router.get("/:id", getRoom);

//GetAll
router.get("/", getRooms);

module.exports = router;