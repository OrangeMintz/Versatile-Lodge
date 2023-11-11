const express = require('express');
const { createReviews, deleteReviews, getReviews } = require('../controllers/reviewsContr.js');

const Reviews = require("../models/Reviews.js");
const { verifyAdmin, verifyUser } = require('../utils/verifyToken.js');

const router = express.Router();

//Create
router.post("/", createReviews);

//Delete
router.delete("/:id", verifyAdmin, deleteReviews);

//GetAll
router.get("/", getReviews);

module.exports = router;