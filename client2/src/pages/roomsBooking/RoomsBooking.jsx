import React from 'react';
import './roomsBooking.css';
import HeaderAdmin from '../../components/HeaderAdmin';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';


const RoomsBooking = () => {
    return (
        <div>
            <HeaderAdmin />
            <Sidebar />
            
                <section className="roomsBooking">
                    <h1 className="heading">Occupied Rooms (Booking)</h1>
                    <div className="roomState">
                        <a href="./roomsReserved">Reserved</a>
                        <a className="stateBtn state">Booking</a>
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