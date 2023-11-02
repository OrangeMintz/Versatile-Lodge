import React, { useState } from 'react';
import "./rooms.css";

const Rooms = () => {
    const [navbarActive, setNavbarActive] = useState(false);

    const toggleNavbar = () => {
        setNavbarActive(!navbarActive);
    };

    return (
        <div>
            {/* <!-- header section --> */}
            <section className="header">
                <div className="flex">
                    <a href="#home" className="logo">Versatile Lodge</a>
                    <a href="#availability" className="btn">Check availability</a>
                    <div className="menu fas fa-bars" id="menu-btn"></div>
                </div>

                <nav className="navbar">
                    <a href="./">Home</a>
                    <a href="./about">About</a>
                    <a href="./rooms" className="active">Rooms</a>
                    <a href="./contact">Contact</a>
                    <a href="./reviews">Reviews</a>
                    <img src="/assets/images/user4.jpg" id="user-btn" alt="user" />
                    {/* <!-- <select id="dropdown">
                    <option value="" selected>Profile</option>
                    <option value="booking-history.html">Booking History</option>
                    <option value="account-setting.html">Account Settings</option>
                    <option value="login.html">Log out</option>
                </select> --> */}
                    <div className="profile">
                        <img src="/assets/images/user4.jpg" alt="" />
                        <h3>Anzai Mitsuyoshi</h3>
                        <span>teacher</span>
                        <a href="account-setting.html" className="btn">view profile</a>
                        <div className="flex-btn">
                            <a href="booking-history.html" className="option-btn">history</a>
                            <a href="login.html" className="option-btn">logout</a>
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
                                <option value="Valencia">Valecia</option>
                                <option value="Maramag">Maramag</option>
                            </select>
                        </div>
                    </form>

                    <form action="" method="post" className="search-form">
                        <input type="text" name="search_box" placeholder="search here..." required maxLength="100" />
                        <button type="submit" className="fas fa-search" name="search_box"></button>

                    </form>
                </div>


                {/* <!-- Create a dashed horizontal rule with a specific color --> */}
                {/* <hr style="border-style: solid; border-color: white"/> */}



                <div className="card-container">

                    <div className="card">
                        <img src="/assets/images/home-img-3.jpg" alt="" />
                        <div className="description">
                            <h3>Room 1</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe commodi, architecto mollitia necessitatibus sit cum nesciunt in sequi eius maxime soluta pariatur temporibus aliquam provident perferendis fugiat voluptatem suscipit incidunt.</p>
                            <div className="detail">
                                <h3 className="price">P750/Night</h3>
                                <a href="roomDetail">View Detail</a>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <img src="/assets/images/home-img-1.jpg" alt="" />
                        <div className="description">
                            <h3>Room 2</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe commodi, architecto mollitia necessitatibus sit cum nesciunt in sequi eius maxime soluta pariatur temporibus aliquam provident perferendis fugiat voluptatem suscipit incidunt.</p>
                            <div className="detail">
                                <h3 className="price">P1050/Night</h3>
                                <a href="roomDetail">View Detail</a>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <img src="/assets/images/home-img-1.jpg" alt="" />
                        <div className="description">
                            <h3>Room 3</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe commodi, architecto mollitia necessitatibus sit cum nesciunt in sequi eius maxime soluta pariatur temporibus aliquam provident perferendis fugiat voluptatem suscipit incidunt.</p>
                            <div className="detail">
                                <h3 className="price">P450/Night</h3>
                                <a href="roomDetail">View Detail</a>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <img src="/assets/images/home-img-2.jpg" alt="" />
                        <div className="description">
                            <h3>Room 4</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe commodi, architecto mollitia necessitatibus sit cum nesciunt in sequi eius maxime soluta pariatur temporibus aliquam provident perferendis fugiat voluptatem suscipit incidunt.</p>
                            <div className="detail">
                                <h3 className="price">P550/Night</h3>
                                <a href="roomDetail">View Detail</a>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <img src="/assets/images/home-img-2.jpg" alt="" />
                        <div className="description">
                            <h3>Room 5</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe commodi, architecto mollitia necessitatibus sit cum nesciunt in sequi eius maxime soluta pariatur temporibus aliquam provident perferendis fugiat voluptatem suscipit incidunt.</p>
                            <div className="detail">
                                <h3 className="price">P550/Night</h3>
                                <a href="roomDetail">View Detail</a>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <img src="/assets/images/home-img-2.jpg" alt="" />
                        <div className="description">
                            <h3>Room 6</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe commodi, architecto mollitia necessitatibus sit cum nesciunt in sequi eius maxime soluta pariatur temporibus aliquam provident perferendis fugiat voluptatem suscipit incidunt.</p>
                            <div className="detail">
                                <h3 className="price">P550/Night</h3>
                                <a href="roomDetail">View Detail</a>
                            </div>
                        </div>
                    </div>
                </div>



            </section>






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
    );
};

export default Rooms;
