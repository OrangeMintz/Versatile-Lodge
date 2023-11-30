const Reviews = require("../models/Reviews.js");

const createError = require('../utils/error.js');

const createReviews = async (req, res, next) => {
    const newReviews = new Reviews(req.body);
    try {
        const savedReviews = await newReviews.save();
        res.status(200).json(savedReviews);
    } catch (err) {
        next(err);
    }
};

const deleteReviews = async (req, res, next) => {
    try {
        const reviews = await Reviews.findByIdAndDelete(req.params.id);
        res.status(200).json("Review Has Been Deleted");
    } catch (err) {
        next(err);
    }
};

const getReviews = async (req, res, next) => {
    try {
        const reviews = await Reviews.find({});
        const hehe = Reviews.length;
        res.status(200).json(reviews)
    } catch (err) {
        next(err)
    }
};

const updateReview = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedReview = await Reviews.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json(updatedReview);
    } catch (err) {
        next(err);
    }
};


const createReply = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { user_id, user_name, user_email, user_image, reply } = req.body;

        const updatedReview = await Reviews.findByIdAndUpdate(
            id,
            {
                $push: {
                    replies: {
                        user_id,
                        user_name,
                        user_email,
                        user_image,
                        reply,
                    },
                },
            },
            { new: true }
        );

        if (!updatedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.status(200).json(updatedReview);
    } catch (err) {
        next(err);
    }
};

const deleteReply = async (req, res, next) => {
    try {
        const { reviewId, replyId } = req.params;

        const updatedReview = await Reviews.findByIdAndUpdate(
            reviewId,
            { $pull: { replies: { _id: replyId } } },
            { new: true }
        );

        if (!updatedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.status(200).json(updatedReview);
    } catch (err) {
        next(err);
    }
};

// Add/Edit the controller function for editing a reply
const editReply = async (req, res) => {
    try {
        const { reviewId, replyId } = req.params;
        const { updatedReplyText } = req.body;

        const review = await Review.findById(reviewId);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        const replyIndex = review.replies.findIndex(reply => reply._id.toString() === replyId);

        if (replyIndex === -1) {
            return res.status(404).json({ message: 'Reply not found' });
        }

        review.replies[replyIndex].reply = updatedReplyText;

        await review.save();

        res.json(review.replies[replyIndex]); // Send back the updated reply
    } catch (error) {
        console.error('Error editing reply:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    createReviews,
    deleteReviews,
    getReviews,
    updateReview,
    createReply,
    deleteReply,
    editReply
};