const express = require('express');
const { createReviews, deleteReviews, getReviews, updateReview, createReply, deleteReply, editReply } = require('../controllers/reviewsContr.js');

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

// Reply
router.post("/:id/replies", createReply);

router.delete("/:reviewId/replies/:replyId", deleteReply);

router.put('/api/reviews/:reviewId/replies/:replyId', editReply);

module.exports = router;