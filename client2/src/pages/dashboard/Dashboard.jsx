import React, { useContext, useEffect, useState } from 'react';

// import styles from './dashboard.module.css';
import './dashboard.css';

import HeaderAdmin from '../../components/HeaderAdmin';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../components/userContext';
const Dashboard = () => {
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
            navigate('/');
        }
    }, [user, operationsComplete, navigate]);
    // Check LOGON
    //GET PROFILE END


    //FETCHED COUNTS 
    const [roomCount, setRoomCount] = useState(0);
    const [reviewCount, setReviewCount] = useState(0);
    useEffect(() => {
        // Fetch room count
        axios.get('/api/room')
            .then(response => {
                setRoomCount(response.data.length);
            })
            .catch(error => {
                console.error('Error fetching room count:', error);
            });

        // Fetch review count
        axios.get('/api/reviews')
            .then(response => {
                setReviewCount(response.data.length);  // Change this line
            })
            .catch(error => {
                console.error('Error fetching review count:', error);
            });
    }, []);

    return (
        // <div className={styles.dashboard}>
        <>
            <div>
                <HeaderAdmin />
                <Sidebar />

                {/* <!-- overview section starts --> */}

                <section className="overview">

                    <h1 className="heading">Overview</h1>

                    <div className="box-container">

                        <div className="box">
                            <span>Occupancy</span>
                            <h3 className="title">Malaybalay:</h3>
                            <p>50%</p>
                        </div>

                        <div className="box">
                            <span>Occupancy</span>
                            <h3 className="title">Maramag:</h3>
                            <p>50%</p>
                        </div>

                        <div className="box">
                            <span>Occupancy</span>
                            <h3 className="title">Valencia:</h3>
                            <p>50%</p>
                        </div>

                        <div className="box">
                            <span>Occupancy</span>
                            <h3 className="title">Total:</h3>
                            <p>50%</p>
                        </div>

                        <div className="box">
                            <h3 className="title">Occupancy Statistics:</h3>
                            <div className="monthly"><i className='fas fa-calendar'></i> Monthly</div>
                            <div className="percents">
                                <div className="percent">100%</div>
                                <div className="percent">75%</div>
                                <div className="percent">50%</div>
                                <div className="percent">25%</div>
                                <div className="percent">0%</div>
                            </div>
                            <div className="rectangles">
                                <div className="rectangle1"></div>
                                <div className="rectangle2"></div>
                                <div className="rectangle3"></div>
                                <div className="rectangle4"></div>
                                <div className="rectangle5"></div>
                                <div className="rectangle6"></div>
                                <div className="rectangle7"></div>
                                <div className="rectangle8"></div>
                                <div className="rectangle9"></div>
                                <div className="rectangle10"></div>
                            </div>
                            <div className="months">
                                <div className="month">Nov</div>
                                <div className="month">Dec</div>
                                <div className="month">Jan</div>
                                <div className="month">Feb</div>
                                <div className="month">Mar</div>
                                <div className="month">Apr</div>
                                <div className="month">May</div>
                                <div className="month">Jun</div>
                                <div className="month">Jul</div>
                                <div className="month">Aug</div>
                            </div>

                        </div>

                        {user && (user.isAdmin) && (
                            <div className="box">
                                <h3 className="title">Rooms and Comments:</h3>
                                <p className="stat">Total Rooms: <span>{roomCount}</span></p>
                                <Link to="/roomsAvailable" className="inline-btn">View rooms</Link>
                                <p className="stat">Total comments: <span>{reviewCount}</span></p>
                                <Link to="/reviewsAdmin" className="inline-btn">View Comments</Link>
                            </div>
                        )}

                        {user && (user.isManager) && (
                            <div className="box">
                                <h3 className="title">Rooms and Comments:</h3>
                                <p className="stat">Total Rooms: <span>{roomCount}</span></p>
                                <Link to="/roomsAvailable" className="inline-btn">View rooms</Link>
                            </div>
                        )}

                    </div>

                </section>

                {/* <!-- overview section ends --> */}

                <Footer />

            </div>

        </>
    )
}

export default Dashboard;