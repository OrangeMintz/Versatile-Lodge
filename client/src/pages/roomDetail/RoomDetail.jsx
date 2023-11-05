import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import useFetch from "../../hooks/useFetch"
import "./roomdetail.css";
import Footer from "../../component/footer";
import Loader from "../../component/Loader";

const RoomDetail = () => {
    const [navbarActive, setNavbarActive] = useState(false);

    const toggleNavbar = () => {
        setNavbarActive(!navbarActive);
    };

    const handleUserBtnClick = () => {                      // for toggling profile
        const profile = document.querySelector('.profile');
        profile.classList.toggle('active');
    }
    const { id } = useParams();
    const apiUrl = `http://localhost:8000/api/room/${id}`;
    const { data, loading, error } = useFetch(apiUrl)

    return (
        <>
            <div>
                <section className="header">
                    <div className="flex">
                        <a href="#home" className="logo">Versatile Lodge</a>
                        <div className="menu fas fa-bars" id="menu-btn"></div>
                    </div>

                    <nav className="navbar">
                        <a href="../">Home</a>
                        <a href="../about">About</a>
                        <a href="../rooms" className="active">Rooms</a>
                        <a href="../contact">Contact</a>
                        <a href="../reviews">Reviews</a>
                        <img src="/assets/images/user4.jpg" id="user-btn" alt="user" onClick={handleUserBtnClick} />
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

                {loading ? (<h1 style={{ paddingTop: '20vh' }} ><Loader /></h1>) : error ? (<Error />)
                    : (
                        <section className="home" id="home">
                            <div className="swiper home-slider">
                                <div className="swiper-wrapper">
                                    {data && data.imageurls ? (
                                        data.imageurls.map((imageUrl, index) => (
                                            <div className="box swiper-slide" key={index}>
                                                <img src={imageUrl} alt={`Image ${index + 1}`} />
                                            </div>
                                        ))
                                    ) : (
                                        <p>No images available</p>
                                    )}
                                </div>
                                <div className="swiper-button-next"></div>
                                <div className="swiper-button-prev"></div>
                            </div>

                            <div className="availability" id="availability">
                                <div className="flex">
                                    <div className="room-details">
                                        <h3 className="room-name">{data.branch} {data.name}</h3>
                                        <div className="room-price">
                                            <h3 className="price">P{data.price}/Night</h3>
                                        </div>
                                    </div>
                                </div>
                                <p className="description"><h4>Description:</h4> {data.desc}</p>
                            </div>
                        </section>
                    )}

                <Footer />
            </div>
        </>

    );
}

export default RoomDetail;
