const express = require('express');
const { createReception, updateReception, deleteAllReceptions, getReception, getReceptions } = require('../controllers/receptionsController');

const Reviews = require("../models/Reviews.js");
const { verifyAdmin, verifyUser } = require('../utils/verifyToken.js');
const authenticateUser = require('../middleware/authMiddleware');
const router = express.Router();

//Create
router.post("/", createReception);

//Update
router.put("/:id", updateReception);

//Delete
router.delete("/", deleteAllReceptions);

//Get
router.get("/:id", getReception);

//Get All
router.get("/", getReceptions);

module.exports = router;