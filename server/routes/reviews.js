const express = require('express');
const { createReviews, deleteReviews, getReviews, updateReview, createReply, deleteReply, editReply } = require('../controllers/reviewsContr.js');

const Reviews = require("../models/Reviews.js");
const { verifyAdmin, verifyUser } = require('../utils/verifyToken.js');
const authenticateUser = require('../middleware/authMiddleware');
const router = express.Router();

//Create
router.post("/", authenticateUser, createReviews);

//Update
router.put("/:id", authenticateUser, updateReview);

//Delete
router.delete("/:id", verifyAdmin, deleteReviews);

//Get All
router.get("/", getReviews);

//Reply
router.post("/:id/replies", verifyAdmin, createReply);

//Delete Reply
router.delete("/:reviewId/replies/:replyId", verifyAdmin, deleteReply);

//Update Reply
// router.put('/:reviewId/replies/:replyId', editReply);

module.exports = router;