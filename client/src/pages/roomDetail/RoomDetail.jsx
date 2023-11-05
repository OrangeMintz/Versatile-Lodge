import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import useFetch from "../../hooks/useFetch"
import "./roomdetail.css";

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
    console.log(data)

    return (
        <>
            <div>
                <section className="header">
                    <div className="flex">
                        <a href="#home" className="logo">Versatile Lodge</a>
                        <a href="#availability" className="btn">Check availability</a>
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

                {/* <!-- home section--> */}
                {loading ? (
                    <h1>Loading Please Wait</h1>
                ) : (
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
                    </section>
                )}

                {loading ? ("Loading Please Wait") : (
                    <section className="availability" id="availability">
                        <div className="flex">
                            <div className="room-details">
                                <h3 className="room-name">{data.branch} {data.name}</h3>
                                <div className="room-price">
                                    <h3 className="price">P{data.price}/Night</h3>
                                </div>
                            </div>
                        </div>

                        <form action="" method="post">
                            <div className="flex">
                                <div className="box">
                                    <p>Check in <span>*</span></p>
                                    <input type="date" name="check_in" className="input" required />
                                </div>
                                <div className="box">
                                    <p>Check out <span>*</span></p>
                                    <input type="date" name="check_out" className="input" required />
                                </div>
                                <div className="box">
                                    <p>Adults<span>*</span></p>
                                    <select name="adults" className="input" required>
                                        <option value="1">1 Adult</option>
                                        <option value="2">2 Adults</option>
                                        <option value="3">3 Adults</option>
                                        <option value="4">4 Adults</option>
                                        <option value="5">5 Adults</option>
                                    </select>
                                </div>
                                <div className="box">
                                    <p>Child<span>*</span></p>
                                    <select name="childs" className="input" required>
                                        <option value="-">None</option>
                                        <option value="1">1 Child</option>
                                        <option value="2">2 Childs</option>
                                        <option value="3">3 Childs</option>
                                        <option value="4">4 Childs</option>
                                        <option value="5">5 Childs</option>
                                    </select>
                                </div>
                            </div>
                            <p className="description"><h4>Description:</h4> {data.desc}</p>
                            <a href="" className="btn">book now</a>
                        </form>
                    </section>
                )}

                {/* <!-- footer section--> */}

                <section className="footer">

                    <div className="box-container">

                        <div className="box">
                            <a href="tel:1234567890"><i className="fas fa-phone"></i>+123-456-7890</a>
                            <a href="tel:1111122333"><i className="fas fa-phone"></i>+111-226-3333</a>
                            <a href="mailto:example@gmail.com"><i className="fas fa-envelope"></i>example@gmail.com</a>
                            <a href="#"><i className="fas fa-map-marker-alt"></i>Malaybalay, Bukidnon - 8700</a>
                        </div>
                        <div className="box">
                            <a href="#home">home</a>
                            <a href="#reservation">reservation</a>
                            <a href="#gallery">gallery</a>
                            <a href="#contact">contact</a>
                            <a href="#reviews">reviews</a>
                        </div>
                        <div className="box">
                            <a href="#">Facebook<i className='fab fa-facebook'></i></a>
                            <a href="#">Twitter<i className="fab fa-twitter"></i></a>
                            <a href="#">Instagram<i className="fab fa-instagram"></i></a>
                            <a href="#">LinkedIn<i className="fab fa-linkedin"></i></a>
                            <a href="#">Youtube<i className="fab fa-youtube"></i></a>
                        </div>
                    </div>

                    <div className="credit">&copy; copyright @ 2023 by BSIT-3B | all rights reserved!</div>

                </section>
            </div>
        </>

    );
}

export default RoomDetail;
