import React, { useContext, useEffect, useState } from 'react';
import './roomsBooking.css';
import HeaderAdmin from '../../components/HeaderAdmin';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../components/userContext';
import axios from 'axios';
import toast from 'react-hot-toast';


const RoomsBooking = () => {

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

    }, [user, operationsComplete, navigate]);
    // Check LOGON



    return (
        <div>
            <HeaderAdmin />
            <Sidebar />

            <section className="roomsBooking">
                <h1 className="heading">Occupied Rooms (Booked)</h1>
                <div className="roomState">
                    <Link to="/roomsReserved">Reserved</Link>
                    <Link className="stateBtn state">Booked</Link>
                </div>
                <div className="roomsRow">
                    <div className="roomsRowWrapper">

                        <img src="https://th.bing.com/th/id/OIP.jVq1bSyqHDv33_3cGJzsKAHaHa?pid=ImgDet&rs=1" alt="" />

                        <div className="roomDetails">
                            <p>Malaybalay</p>
                            <p>Room #1</p>
                            <span>From: 11-20-2023</span>
                            <span>To: 11-29-2023</span>
                        </div>
                        <div className="roomButtons">
                            <button className="roomBtn">Update</button>
                            <button className="roomBtn">Unavailable</button>
                        </div>
                    </div>
                </div>
                <div className="roomsRow">
                    <div className="roomsRowWrapper">
                        <img src="https://th.bing.com/th/id/OIP.jVq1bSyqHDv33_3cGJzsKAHaHa?pid=ImgDet&rs=1" alt="" />
                        <div className="roomDetails">
                            <p>Valencia</p>
                            <p>Room #1</p>
                            <span>From: 11-20-2023</span>
                            <span>To: 11-29-2023</span>
                        </div>
                        <div className="roomButtons">
                            <button className="roomBtn">Update</button>
                            <button className="roomBtn">Unavailable</button>
                        </div>
                    </div>
                </div>
                <div className="roomsRow">
                    <div className="roomsRowWrapper">
                        <img src="https://th.bing.com/th/id/OIP.jVq1bSyqHDv33_3cGJzsKAHaHa?pid=ImgDet&rs=1" alt="" />
                        <div className="roomDetails">
                            <p>Maramag</p>
                            <p>Room #1</p>
                            <span>From: 11-20-2023</span>
                            <span>To: 11-29-2023</span>
                        </div>
                        <div className="roomButtons">
                            <button className="roomBtn">Update</button>
                            <button className="roomBtn">Unavailable</button>
                        </div>
                    </div>
                </div>
                <div className="roomsRow">
                    <div className="roomsRowWrapper">
                        <img src="https://th.bing.com/th/id/OIP.jVq1bSyqHDv33_3cGJzsKAHaHa?pid=ImgDet&rs=1" alt="" />
                        <div className="roomDetails">
                            <p>Maramag</p>
                            <p>Room #2</p>
                            <span>From: 11-20-2023</span>
                            <span>To: 11-29-2023</span>
                        </div>
                        <div className="roomButtons">
                            <button className="roomBtn">Update</button>
                            <button className="roomBtn">Unavailable</button>
                        </div>
                    </div>
                </div>
                <div className="roomsRow">
                    <div className="roomsRowWrapper">
                        <img src="https://th.bing.com/th/id/OIP.jVq1bSyqHDv33_3cGJzsKAHaHa?pid=ImgDet&rs=1" alt="" />
                        <div className="roomDetails">
                            <p>Malaybalay</p>
                            <p>Room #3</p>
                            <span>From: 11-20-2023</span>
                            <span>To: 11-29-2023</span>
                        </div>
                        <div className="roomButtons">
                            <button className="roomBtn">Update</button>
                            <button className="roomBtn">Unavailable</button>
                        </div>
                    </div>
                </div>
                <div className="roomsRow">
                    <div className="roomsRowWrapper">
                        <img src="https://th.bing.com/th/id/OIP.jVq1bSyqHDv33_3cGJzsKAHaHa?pid=ImgDet&rs=1" alt="" />
                        <div className="roomDetails">
                            <p>Valencia</p>
                            <p>Room #3</p>
                            <span>From: 11-20-2023</span>
                            <span>To: 11-29-2023</span>
                        </div>
                        <div className="roomButtons">
                            <button className="roomBtn">Update</button>
                            <button className="roomBtn">Unavailable</button>
                        </div>
                    </div>
                </div>

            </section>

            <Footer />

        </div>
    )
}

export default RoomsBooking;