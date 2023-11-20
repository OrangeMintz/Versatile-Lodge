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


    return (
        <>
            <div>
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
                                    <div className="more-btn">
                                        <Link to="#" className="inline-option-btn">
                                            View more
                                        </Link>
                                    </div>
                                </div>
                            ))}
                    </div>


                </section>


                <Footer />
            </div>
        </>
    )
}

export default ReviewsAdmin;