import React, { useState, useEffect, useContext } from 'react';
import './reviews.css';
import Footer from '../../component/footer';
import Navbar from '../../component/Navbar';
import axios from 'axios';
import { UserContext } from '../../context/userContext';
import Loader from '../../component/Loader';
import Error from '../../component/Error';
import moment from 'moment';
import toast from 'react-hot-toast';

const Reviews = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [comment, setComment] = useState('');
    const [userReview, setUserReview] = useState(null);
    const [userBooking, setUserBooking] = useState(null);

    const { user } = useContext(UserContext);

    // Fetch user's booking information
    const fetchUserBooking = async () => {
        try {
            const response = await axios.get('/api/booking');
            setUserBooking(response.data);
        } catch (error) {
            console.error('Error fetching user booking:', error);
        }
    };

    useEffect(() => {
        fetchUserBooking();
    }, [user]);

    // FETCHED REVIEWS
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get('/api/reviews');
                // Sort reviews by the most recent date
                const sortedReviews = response.data.sort((a, b) => moment(b.date) - moment(a.date));
                setReviews(sortedReviews);

                // If user is logged in, check for booking and user review
                if (user && userBooking) {
                    const reservationReview = sortedReviews.find(
                        (review) =>
                            review.user_id === user.id &&
                            review.room_id === userBooking?.room_id &&
                            moment(review.createdAt).isSameOrAfter(moment(userBooking?.fromDate)) &&
                            moment(review.createdAt).isSameOrBefore(moment(userBooking?.toDate))
                    );
                    setUserReview(reservationReview || null);
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching reviews:', error);
                setError('Error fetching reviews. Please try again.');
                setLoading(false);
            }
        };

        fetchReviews();
    }, [user, userBooking]);

    // Helper function to check if the user has a valid booking
    const hasValidBooking = () => {
        if (!userBooking || !user) {
            return false;
        }

        const validBooking = userBooking.find(
            (booking) =>
                booking.user_id === user.id &&
                booking.status === 'reserved' &&
                moment().isSameOrAfter(moment(booking.fromDate)) &&
                moment().isSameOrBefore(moment(booking.toDate).add(3, 'days'))
        );

        return !!validBooking;
    };

    // Helper function to check if the user has submitted a review for the current reservation
    const hasSubmittedReview = () => {
        if (!userReview) {
            return false;
        }

        const isSameReservation =
            userReview.room_id === userBooking.room_id &&
            moment(userReview.createdAt).isSameOrAfter(moment(userBooking.fromDate)) &&
            moment(userReview.createdAt).isSameOrBefore(moment(userBooking.toDate));

        return isSameReservation;
    };

    // Helper function to count the number of bookings for the user on the currentDate that overlap with their bookings
    const countUserBookingsOnCurrentDate = () => {
        const currentDate = moment();
        if (!userBooking) {
            return 0;
        }

        return userBooking.filter(
            (booking) =>
                booking.user_id === user.id &&
                moment(currentDate).isSameOrAfter(moment(booking.fromDate)) &&
                moment(currentDate).isSameOrBefore(moment(booking.toDate).add(3, 'days'))
        ).length;
    };

    // Helper function to count the number of reviews for the user
    const countUserReviews = () => {
        return reviews.filter((review) => review.user_id === user.id).length;
    };

    // Helper function to check if a review has been submitted for the given room within the specified timeframe
    const hasReviewForRoom = (room_id, toDate) => {
        const timeframeEndDate = moment(toDate).add(3, 'days');
        const reviewExists = reviews.some(
            (review) =>
                review.room_id === room_id &&
                moment(review.date).isSameOrAfter(toDate) &&
                moment(review.date).isSameOrBefore(timeframeEndDate) &&
                review.user_id === user.id
        );
        return reviewExists;
    };

    // SUBMIT REVIEW
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const currentDate = new Date();

            if (hasValidBooking()) {
                if (!hasReviewForRoom(userBooking.room_id, userBooking.toDate)) {
                    const userResponse = await axios.get('/profile');
                    const currentUser = userResponse.data;

                    // Always create a new review
                    const newReview = {
                        user_id: user.id,
                        name: currentUser.name,
                        image: currentUser.image,
                        comment,
                        date: currentDate.toISOString(),
                        updatedAt: currentDate.toISOString(),
                    };

                    await axios.post('/api/reviews', newReview);
                    toast.success('Review Submitted');

                    // Fetch the updated list of reviews
                    const updatedReviews = await axios.get('/api/reviews');
                    const sortedReviews = updatedReviews.data.sort((a, b) => moment(b.date) - moment(a.date));
                    setReviews(sortedReviews);

                    setComment('');
                } else {
                    toast.error('A review for this room has already been submitted within the specified timeframe.');
                }
            } else {
                toast.error('Invalid booking or outside the allowed timeframe.');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    //show hide reply
    const [replyVisible, setReplyVisible] = useState({});

    const toggleReplyVisibility = (reviewId) => {
        setReplyVisible((prev) => ({ ...prev, [reviewId]: !prev[reviewId] }));
    };

    return (
        <div>
            <Navbar />
            <section className="reviews-heading">
                <h1>--- Reviews ---</h1>
            </section>

            <div className="reviews-container">
                {loading && <Loader />}
                {error && <Error />}

                {!loading &&
                    !error &&
                    reviews.map((review) => (
                        <div className="review" key={review._id}>
                            <div className="message">
                                <div className="message-left">
                                    <img src={review.image} alt="" />
                                    <h3>{review.name}</h3>
                                </div>
                                <div className="message-right">
                                    <p style={{ textAlign: 'justify' }}>{review.comment}</p>
                                    <p>{moment(review.date).format('MMMM DD YYYY HH:mm:ss')}</p>
                                </div>
                            </div>

                            {review.replies && review.replies.length > 0 && (
                                <button
                                    className="reply-toggle-btn"
                                    onClick={() => toggleReplyVisibility(review._id)}
                                >
                                    {replyVisible[review._id] ? 'Hide Reply' : 'Show Reply'}
                                </button>
                            )}

                            {review.replies && review.replies.length > 0 && replyVisible[review._id] && (
                                <div className="replyContainer">
                                    {review.replies.map((reply) => (
                                        <div className="reply" key={reply._id}>
                                            <div className="reply-left">
                                                <img src={reply.user_image} alt="" />
                                                <h3>{reply.user_name}</h3>
                                            </div>
                                            <div className="reply-right">
                                                <p style={{ textAlign: 'justify' }}>{reply.reply}</p>
                                                <p>{moment(reply.date).format('MMMM DD YYYY HH:mm:ss')}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
            </div>

            {hasValidBooking() && !hasSubmittedReview() && countUserBookingsOnCurrentDate() > countUserReviews() && (
                <section className="contactUs" id="contactUS" style={{ marginTop: '50px' }}>
                    <div className="container">
                        <form onSubmit={handleSubmit}>
                            <h3 className="sendUsReview">Send Us Review</h3>
                            <textarea
                                name="msg"
                                className="boxArea"
                                required
                                maxLength="500"
                                placeholder="Enter your message"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                style={{ width: '1000px', fontSize: '18px' }}
                                cols="30"
                                rows="15"
                            ></textarea>
                            <input type="submit" value="Send Message" name="send" className="reviewBtn" />
                        </form>
                    </div>
                </section>
            )}

            <Footer />
        </div>
    );
};

export default Reviews;
