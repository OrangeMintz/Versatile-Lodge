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
                booking.status === 'booked' &&
                (moment(booking.toDate).isSameOrBefore(moment(), 'day') ||
                    moment(booking.toDate).isSame(moment(), 'day'))
        );

        return !!validBooking;
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
                            <div className="review-left">
                                <img src={review.image} alt="" />
                                <h3>{review.name}</h3>
                            </div>
                            <div className="review-right">
                                <p style={{ textAlign: 'justify' }}>{review.comment}</p>
                                <p>{moment(review.date).format('MMMM DD YYYY HH:mm:ss')}</p>
                            </div>
                        </div>
                    ))}
            </div>

            {hasValidBooking() && !userReview && (
                <section className="contact" id="contact" style={{ marginTop: '100px' }}>
                    <div className="row">
                        <form onSubmit={handleSubmit}>
                            <h3>Send Us A Review</h3>
                            <textarea
                                name="msg"
                                className="box"
                                required
                                maxLength="1000"
                                placeholder="enter your message"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                cols="30"
                                rows="10"
                                style={{
                                    background: '#DCC69C',
                                    color: '#2B1103',
                                    padding: '1em',
                                    borderRadius: '5px',
                                    height: '250px',
                                }}
                            ></textarea>
                            <input type="submit" value="send message" name="send" className="btn" />
                        </form>
                    </div>
                </section>
            )}
            <Footer />
        </div>
    );
};

export default Reviews;
