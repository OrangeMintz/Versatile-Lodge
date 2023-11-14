import React from 'react';
import './roomsOccupied.css';
import HeaderAdmin from '../../components/HeaderAdmin';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';


const RoomsOccupied = () => {
    return (
        <div>
            <HeaderAdmin />
            <Sidebar />
            
                <section className="roomsOccupied">
                    <h1 className="heading">Occupied Rooms</h1>
                    <div className="roomState">
                        <a href="./roomsAvailable">Available Rooms</a>
                        <a className="stateBtn state">Occupied Rooms</a>
                        <span className="addRoom">+ Add Room</span>
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

export default RoomsOccupied;