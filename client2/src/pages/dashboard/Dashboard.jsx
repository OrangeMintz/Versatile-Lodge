// import styles from './dashboard.module.css';

import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import HeaderAdmin from '../../components/HeaderAdmin';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import axios from 'axios';
import { UserContext } from '../../components/userContext';
import './dashboard.css';
import moment from 'moment';



const Dashboard = () => {
    const navigate = useNavigate()

    // Check LOGON
    const { user, setUser } = useContext(UserContext);
    const [operationsComplete, setOperationsComplete] = useState(false);
    useEffect(() => {
        if (!user) {
            axios
                .get('/profile/admin')
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

    const [roomData, setRoomData] = useState([]);

    useEffect(() => {
        // Fetch room data from the API
        axios.get('/api/room')
            .then(response => {
                setRoomData(response.data);
            })
            .catch(error => {
                console.error('Error fetching room data:', error);
            });
    }, []);


    const calculateOccupancy = (branchName) => {
        // Filter rooms based on the branch name
        const branchRooms = roomData.filter((room) => room.branch === branchName);

        // Get the current date in the format "MM-DD-YYYY"
        const todayDate = moment().format('MM-DD-YYYY');

        // Count the number of rooms occupied for the current day
        const occupiedRoomsCount = branchRooms.reduce((count, room) => {
            // Check if there is a booking with status "booked" and for the current day
            if (
                room.currentbookings.some(
                    (booking) => {
                        const fromDate = moment(booking.fromDate, 'MM-DD-YYYY').format('MM-DD-YYYY');
                        const toDate = moment(booking.toDate, 'MM-DD-YYYY').format('MM-DD-YYYY');
                        const isBookedForToday = moment(todayDate).isBetween(fromDate, toDate, null, '[]');
                        console.log('Booking:', booking, 'Is Booked for Today:', isBookedForToday);
                        return booking.status === 'booked' && isBookedForToday;
                    }
                )
            ) {
                return count + 1;
            }
            return count;
        }, 0);

        // Calculate the occupancy percentage
        const occupancyPercentage = (occupiedRoomsCount / branchRooms.length) * 100 || 0; // Prevent division by zero

        console.log('Occupied Rooms Count:', occupiedRoomsCount, 'Total Rooms:', branchRooms.length, 'Occupancy Percentage:', occupancyPercentage);

        return { occupiedRoomsCount, occupancyPercentage };
    };

    const MalaybalayOccupancy = calculateOccupancy('Malaybalay');
    const MaramagOccupancy = calculateOccupancy('Maramag');
    const ValenciaOccupancy = calculateOccupancy('Valencia');

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
                            <p>{MalaybalayOccupancy.occupancyPercentage.toFixed(1)}%</p>
                        </div>

                        <div className="box">
                            <span>Occupancy</span>
                            <h3 className="title">Maramag:</h3>
                            <p>{MaramagOccupancy.occupancyPercentage.toFixed(1)}%</p>
                        </div>

                        <div className="box">
                            <span>Occupancy</span>
                            <h3 className="title">Valencia:</h3>
                            <p>{ValenciaOccupancy.occupancyPercentage.toFixed(1)}%</p>
                        </div>

                        <div className="box">
                            <span>Occupancy</span>
                            <h3 className="title">Total:</h3>
                            <p>{(((MalaybalayOccupancy.occupiedRoomsCount + MaramagOccupancy.occupiedRoomsCount + ValenciaOccupancy.occupiedRoomsCount) / roomData.length) * 100).toFixed(1)}%</p>
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