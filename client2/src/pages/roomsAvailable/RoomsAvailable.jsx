import React, { useContext, useEffect, useState } from 'react';
import './roomsAvailable.css';
import HeaderAdmin from '../../components/HeaderAdmin';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../components/userContext';
import axios from 'axios';
import toast from 'react-hot-toast';


const RoomsAvailable = () => {

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

            <section className="roomsAvailable">
                <h1 className="heading">Available Rooms</h1>
                <div className="roomState">
                    <a className="stateBtn state">Available Rooms</a>
                    <a href="./roomsUnavailable">Unavailable Rooms</a>
                    <span className="addRoom">+ Add Room</span>
                </div>
                <div className="roomsRow">
                    <div className="roomsRowWrapper">
                        <img src="https://th.bing.com/th/id/OIP.KW6xLZGZcpwJjQgXnkI35QHaFD?pid=ImgDet&rs=1" alt="" />
                        <div className="roomDetails">
                            <p>Malaybalay</p>
                            <p>Room #1</p>
                        </div>
                        <div className="roomButtons">
                            <button className="roomBtn">Update</button>
                            <button className="roomBtn">Unavailable</button>
                        </div>
                    </div>
                </div>
                <div className="roomsRow">
                    <div className="roomsRowWrapper">
                        <img src="https://th.bing.com/th/id/OIP.KW6xLZGZcpwJjQgXnkI35QHaFD?pid=ImgDet&rs=1" alt="" />
                        <div className="roomDetails">
                            <p>Valencia</p>
                            <p>Room #1</p>
                        </div>
                        <div className="roomButtons">
                            <button className="roomBtn">Update</button>
                            <button className="roomBtn">Unavailable</button>
                        </div>
                    </div>
                </div>
                <div className="roomsRow">
                    <div className="roomsRowWrapper">
                        <img src="https://th.bing.com/th/id/OIP.KW6xLZGZcpwJjQgXnkI35QHaFD?pid=ImgDet&rs=1" alt="" />
                        <div className="roomDetails">
                            <p>Maramag</p>
                            <p>Room #1</p>
                        </div>
                        <div className="roomButtons">
                            <button className="roomBtn">Update</button>
                            <button className="roomBtn">Unavailable</button>
                        </div>
                    </div>
                </div>
                <div className="roomsRow">
                    <div className="roomsRowWrapper">
                        <img src="https://th.bing.com/th/id/OIP.KW6xLZGZcpwJjQgXnkI35QHaFD?pid=ImgDet&rs=1" alt="" />
                        <div className="roomDetails">
                            <p>Maramag</p>
                            <p>Room #2</p>
                        </div>
                        <div className="roomButtons">
                            <button className="roomBtn">Update</button>
                            <button className="roomBtn">Unavailable</button>
                        </div>
                    </div>
                </div>
                <div className="roomsRow">
                    <div className="roomsRowWrapper">
                        <img src="https://th.bing.com/th/id/OIP.KW6xLZGZcpwJjQgXnkI35QHaFD?pid=ImgDet&rs=1" alt="" />
                        <div className="roomDetails">
                            <p>Malaybalay</p>
                            <p>Room #3</p>
                        </div>
                        <div className="roomButtons">
                            <button className="roomBtn">Update</button>
                            <button className="roomBtn">Unavailable</button>
                        </div>
                    </div>
                </div>
                <div className="roomsRow">
                    <div className="roomsRowWrapper">
                        <img src="https://th.bing.com/th/id/OIP.KW6xLZGZcpwJjQgXnkI35QHaFD?pid=ImgDet&rs=1" alt="" />
                        <div className="roomDetails">
                            <p>Valencia</p>
                            <p>Room #3</p>
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

export default RoomsAvailable;