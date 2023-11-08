import React, { useState } from 'react';
import useFetch from "../../hooks/useFetch"
import "./rooms.css";
import Loader from '../../component/Loader';
import Footer from '../../component/footer';
import Error from '../../component/Error';

const Rooms = () => {
    const [navbarActive, setNavbarActive] = useState(false);

    const toggleNavbar = () => {
        setNavbarActive(!navbarActive);
    };
    const { data, loading, error } = useFetch("http://localhost:8000/api/room/")

    // console.log("Rooms Data", data);

    const handleUserBtnClick = () => {                      // for toggling profile
        const profile = document.querySelector('.profile');
        profile.classList.toggle('active');
    }

    return (
        <>
            {/* <!-- header section --> */}
            <section className="header">
                <div className="flex">
                    <a href="#home" className="logo">Versatile Lodge</a>
                    <div className="menu fas fa-bars" id="menu-btn"></div>
                </div>

                <nav className="navbar">
                    <a href="./">Home</a>
                    <a href="./about">About</a>
                    <a href="./rooms" className="active">Rooms</a>
                    <a href="./contact">Contact</a>
                    <a href="./reviews">Reviews</a>
                    <img src="/assets/images/user4.jpg " id="user-btn" alt="user" onClick={handleUserBtnClick} />
                    {/* <!-- <select id="dropdown">
                    <option value="" selected>Profile</option>
                    <option value="booking-history.html">Booking History</option>
                    <option value="account-setting.html">Account Settings</option>
                    <option value="login.html">Log out</option>
                </select> --> */}
                    <div className="profile">
                        <img src="/assets/images/user4.jpg" alt="" />
                        <h3>Anzai Mitsuyoshi</h3>
                        <span>client</span>
                        <a href="accountSetting" className="btn">View Profile</a>
                        <div className="flex-btn">
                            <a href="bookingHistory" className="option-btn">History</a>
                            <a href="login" className="option-btn">Logout</a>
                        </div>
                    </div>
                </nav>
            </section>

            {/* <!-- rooms section --> */}
            <section className="rooms">

                <h1>--- Explore Our Rooms ---</h1>

                <div className="flex">
                    <form action="">
                        <div className="box">
                            <select name="adults" className="input" required>
                                <option value="Malabalay">All</option>
                                <option value="Malabalay">Malabalay</option>
                                <option value="Valencia">Valencia</option>
                                <option value="Maramag">Maramag</option>
                            </select>
                        </div>
                    </form>

                    <form action="" method="post" className="search-form">
                        <input type="text" name="search_box" placeholder="Search..." required maxLength="100" />
                        <button type="submit" className="fas fa-search" name="search_box"></button>

                    </form>
                </div>
                {/* <!-- Create a dashed horizontal rule with a specific color --> */}
                {/* <hr style="border-style: solid; border-color: white"/> */}

                <div className="card-container">
                    {loading ? (<h1><Loader /></h1>) : error ? (<Error />)
                        : (
                            data
                                .slice() // Create a shallow copy of the data to avoid modifying the original array
                                .sort((room1, room2) => {
                                    // Extract the room number from the room names
                                    const roomNumber1 = parseInt(room1.name.match(/\d+/)[0]);
                                    const roomNumber2 = parseInt(room2.name.match(/\d+/)[0]);
                                    // Compare the room numbers
                                    return roomNumber1 - roomNumber2;
                                })
                                .map((room, index) => (
                                    <div className="card" key={index}>
                                        <img src={room.imageurls[0]} alt={room.name} />
                                        <div className="description">
                                            <div className="room-details">
                                                <h3 className="room-name">{room.name}</h3>
                                                <h2 className="price">P{room.price}/Night</h2>

                                            </div>
                                            <div className="detail">
                                                <h2 className="room-branch">{room.branch}</h2>
                                            </div>
                                            <p>{room.desc}</p>

                                            <div className="view-book">
                                                <a href={`bookingDetail/${room._id}`}>Book Now</a>
                                                <a href={`roomDetail/${room._id}`}>View Detail</a>
                                            </div>
                                        </div>
                                    </div>
                                ))
                        )}
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Rooms;
