const express = require('express');
const { createReviews, deleteReviews, getReviews, updateReview } = require('../controllers/reviewsContr.js');

const Reviews = require("../models/Reviews.js");
const { verifyAdmin, verifyUser } = require('../utils/verifyToken.js');

const router = express.Router();

//Create
router.post("/", createReviews);

router.put("/:id", updateReview);


//Delete
router.delete("/:id", deleteReviews);

//GetAll
router.get("/", getReviews);

module.exports = router;