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
import { Navigate } from 'react-router-dom';

const Reviews = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [comment, setComment] = useState('');
    const [userReview, setUserReview] = useState(null);
    const [userBooking, setUserBooking] = useState(null);

    const { user, setUser } = useContext(UserContext);

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
        if (user) {
            fetchUserBooking();
        }
    }, [user]);

    // FETCHED REVIEWS
    const fetchReviews = async () => {
        try {
            const response = await axios.get('/api/reviews');
            // Sort reviews by the most recent date
            const sortedReviews = response.data.sort((a, b) => moment(b.date) - moment(a.date));
            setReviews(sortedReviews);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching reviews:', error);
            setError('Error fetching reviews. Please try again.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    // SUBMIT REVIEW
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const userResponse = await axios.get('/profile');
            const currentUser = userResponse.data;
            const currentDate = new Date();

            // Check if there's an existing review for the current user
            const existingReview = reviews.find((review) => review.user_id === user.id);

            if (existingReview) {
                // If a review exists for the current user, update the existing review
                const updatedReview = {
                    ...existingReview,
                    name: currentUser.name,
                    image: currentUser.image,
                    comment,
                    date: currentDate.toISOString(),
                };

                await axios.put(`/api/reviews/${existingReview._id}`, updatedReview);
                // toast.success('Review Updated')
                window.location.href = `${window.location.origin}/reviews`;


                // Update the reviews state to reflect the changes
                setReviews((prevReviews) =>
                    prevReviews.map((review) =>
                        review._id === existingReview._id ? updatedReview : review
                    )
                );
            } else {
                // If no review exists, create a new review
                const newReview = {
                    user_id: user.id,
                    name: currentUser.name,
                    image: currentUser.image,
                    comment,
                    date: currentDate.toISOString(),
                    updatedAt: currentDate.toISOString()
                };

                await axios.post('/api/reviews', newReview);
                // toast.success("Review Submitted")
                window.location.href = `${window.location.origin}/reviews`;

                // Fetch the updated list of reviews
                fetchReviews();
            }

            setComment('');
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    // Helper function to check if the user has a valid booking
    const hasValidBooking = () => {
        if (!userBooking) {
            return false;
        }

        const validBooking = userBooking.find(
            (booking) =>
                booking.user_id === user.id &&
                booking.status === 'reserved' &&
                (moment(booking.toDate).isSameOrBefore(moment(), 'day') ||
                    moment(booking.toDate).isSame(moment(), 'day'))
        );

        return !!validBooking;
    };

    //show hide reply
    const [replyVisible, setReplyVisible] = useState({});


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
                            {!replyVisible[review._id] && (
                                <button
                                    className="reply-toggle-btn"
                                    onClick={() => setReplyVisible({ ...replyVisible, [review._id]: true })}
                                >
                                    Show Reply
                                </button>
                            )}

                            {replyVisible[review._id] && (
                            <div className="replyContainer"> 

                                <button
                                    className="reply-toggle-btn"
                                    onClick={() => setReplyVisible({ ...replyVisible, [review._id]: false })}
                                >
                                    Hide Reply
                                </button>
                                    <div className="reply">
                                        <div className="reply-left">
                                            <img src={review.image} alt="" />
                                            <h3>{review.name}</h3>
                                        </div>
                                        <div className="reply-right">
                                            <p style={{ textAlign: 'justify' }}>{review.comment}</p>
                                            <p>{moment(review.date).format('MMMM DD YYYY HH:mm:ss')}</p>
                                        </div>
                                    </div>
                                </div>  
                            )}
                        </div>
                    ))}

            </div>

            {hasValidBooking() && !userReview && (
                <section className="contactUs" id="contactUS" style={{ marginTop: '50px' }}>
                    <div className="container">
                        <form onSubmit={handleSubmit}>
                            <h3 className='sendUsReview'>Send Us Review</h3>
                            <textarea
                                name="msg"
                                className="boxArea"
                                required
                                maxLength="1000"
                                placeholder="Enter your message"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                style={{ width: "1000px", fontSize: "18px" }}
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
