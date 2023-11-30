import React, { useContext, useEffect, useState } from 'react';
import './reviewsAdmin.css';
import HeaderAdmin from '../../components/HeaderAdmin';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';

import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../components/userContext';
import toast from 'react-hot-toast';
import Error from '../../components/Error';
import Loader from '../../components/Loader';
import moment from 'moment';


const ReviewsAdmin = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [comment, setComment] = useState('');
    const [userReview, setUserReview] = useState(null);
    const [userBooking, setUserBooking] = useState(null);


    const navigate = useNavigate()

    // Check LOGON
    const { user, setUser } = useContext(UserContext);
    const [operationsComplete, setOperationsComplete] = useState(false);
    useEffect(() => {
        if (!user) {
            axios
                .get('/profile')
                .then(({ data }) => {
                    setUser(data);
                })
                .catch((error) => {
                    console.error('Error fetching user profile:', error);
                })
                .finally(() => {
                    // Set operationsComplete to true after data fetching is complete
                    setOperationsComplete(true);
                });
        }
    }, [user, setUser]);

    useEffect(() => {
        if (operationsComplete && !user) {
            navigate('/401');
            toast.error("Unauthorized Access")

        }
        if (operationsComplete && user && user.isEmployee == true) {
            toast.error("Unauthorized Access")
            navigate('/dashboard');

        }

        if (operationsComplete && user && user.isManager == true) {
            toast.error("Unauthorized Access")
            navigate('/dashboard');

        }
    }, [user, operationsComplete, navigate]);
    // Check LOGON


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


    //REPLY
    const MAX_CHARACTERS_TO_SHOW = 50;

    const [replyInputs, setReplyInputs] = useState({});
    const [showReplyInput, setShowReplyInput] = useState({});
    const [expandedReviewIds, setExpandedReviewIds] = useState({});





    const handleCancelReply = (reviewId) => {
        // Hide the reply input and button
        setShowReplyInput((prev) => ({ ...prev, [reviewId]: false }));
        // Clear the reply input value
        setReplyInputs((prevInputs) => ({ ...prevInputs, [reviewId]: '' }));
    };


    const updateReplyInput = (reviewId, value) => {
        setReplyInputs((prevInputs) => ({ ...prevInputs, [reviewId]: value }));
    };

    const handleReply = async (reviewId, event) => {
        try {
            const { id, name, email, image } = user; // Get user details
            const replyText = replyInputs[reviewId];

            if (replyText) {
                // Send a POST request to create a reply
                const response = await axios.post(`/api/reviews/${reviewId}/replies`, {
                    user_id: id,
                    user_name: name,
                    user_email: email,
                    user_image: image,
                    reply: replyText,
                });

                // Update the reviews state with the new data
                setReviews((prevReviews) =>
                    prevReviews.map((review) =>
                        review._id === reviewId ? response.data : review
                    )
                );

                // Clear the reply input value
                setReplyInputs((prevInputs) => ({ ...prevInputs, [reviewId]: '' }));
                // Hide the reply input and button
                setShowReplyInput((prev) => ({ ...prev, [reviewId]: false }));
            } else {
                // Handle empty reply text
                toast.error('Please enter a reply.');
            }
        } catch (error) {
            console.error('Error sending reply:', error);
            toast.error('Error sending reply. Please try again.');
        }
    };


    const handleDeleteReply = async (reviewId, replyId) => {
        try {
            // Send a DELETE request to delete a reply
            await axios.delete(`/api/reviews/${reviewId}/replies/${replyId}`);

            // Update the reviews state without the deleted reply
            setReviews((prevReviews) =>
                prevReviews.map((review) => {
                    if (review._id === reviewId) {
                        return {
                            ...review,
                            replies: review.replies.filter((reply) => reply._id !== replyId),
                        };
                    }
                    return review;
                })
            );

            toast.success('Reply deleted successfully');
        } catch (error) {
            console.error('Error deleting reply:', error);
            toast.error('Error deleting reply. Please try again.');
        }
    };

    const handleShowMoreReplies = (reviewId) => {
        setExpandedReviewIds((prev) => ({
            ...prev,
            [reviewId]: !prev[reviewId],
        }));
    };

    return (
        <div className='reviewsPage'>
            <HeaderAdmin />
            <Sidebar />

            <section className="reviews">
                <h1 className="heading">Customer's Reviews</h1>

                <div className="box-container">
                    {loading && <Loader />}
                    {error && <Error />}

                    {!loading &&
                        !error &&
                        reviews.map((review) => (
                            <div className="box" key={review._id}>
                                <div className="customer">
                                    <img src={review.image} alt="" />
                                    <div>
                                        <h3>{review.name}</h3>
                                        <span>{moment(review.date).format('MMMM DD YYYY HH:mm:ss')}</span>
                                    </div>
                                </div>
                                <p>{review.comment}</p>
                                <div className="reply-container">
                                    {showReplyInput[review._id] && (
                                        <div className='replyInputAndBtn'>
                                            <input
                                                className='replyInput'
                                                type="text"
                                                placeholder="Type your reply..."
                                                value={replyInputs[review._id] || ''}
                                                onChange={(e) => updateReplyInput(review._id, e.target.value)}
                                            />
                                            <div className='replyBtns'>
                                                <button className="reply-btn1" onClick={() => handleReply(review._id)}>
                                                    Reply
                                                </button>
                                                <button className="reply-btn2" onClick={() => handleCancelReply(review._id)}>
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    {!showReplyInput[review._id] && (
                                        <button className="reply-btn2" onClick={() => setShowReplyInput((prev) => ({ ...prev, [review._id]: true }))}>
                                            Reply
                                        </button>
                                    )}
                                    {review.replies.length > 0 && (
                                        <>
                                            {review.replies.slice(0, expandedReviewIds[review._id] ? review.replies.length : 1).map((reply, index) => (
                                                <div key={reply._id} className={`replyContent ${review._id === expandedReviewIds ? '' : 'hidden-reply'}`}>
                                                    <div className="customer">
                                                        <img src={reply.user_image} alt="" />
                                                        <div>
                                                            <h3>{reply.user_name}</h3>
                                                            <span>{moment(reply.date).format('MMMM DD YYYY HH:mm:ss')}</span>
                                                        </div>
                                                    </div>
                                                    <div className="admin-reply">
                                                        <p style={{ marginBottom: "20px" }}>
                                                            {reply.reply.length > MAX_CHARACTERS_TO_SHOW
                                                                ? (
                                                                    <>
                                                                        {reply.expanded ? reply.reply : `${reply.reply.substring(0, MAX_CHARACTERS_TO_SHOW)}...`}
                                                                        <span
                                                                            style={{ marginLeft: '5px', cursor: 'pointer', fontSize: "1em" }}
                                                                            onClick={() => {
                                                                                const updatedReplies = [...review.replies];
                                                                                updatedReplies[index].expanded = !updatedReplies[index].expanded;
                                                                                setReviews((prevReviews) => prevReviews.map((prevReview) => (prevReview._id === review._id ? { ...prevReview, replies: updatedReplies } : prevReview)));
                                                                            }}
                                                                        >
                                                                            {reply.expanded ? 'Show Less' : 'Show More'}
                                                                        </span>
                                                                    </>
                                                                )
                                                                : reply.reply
                                                            }
                                                        </p>
                                                        <button onClick={() => handleDeleteReply(review._id, reply._id)}>Delete</button>
                                                    </div>
                                                </div>
                                            ))}
                                            {review.replies.length > 1 && (
                                                <button
                                                    style={{ marginTop: "15px", borderRadius: "5px", padding: "10px" }}
                                                    onClick={() => handleShowMoreReplies(review._id)}
                                                >
                                                    {expandedReviewIds[review._id] ? 'Show Less Replies' : 'Show More Replies'}
                                                </button>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}

                </div>


            </section>

            <Footer />

        </div>
    )
}

export default ReviewsAdmin;