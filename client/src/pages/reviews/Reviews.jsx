import React, { useState } from 'react';
import "./reviews.css";
import Footer from '../../component/footer';

const Reviews = () => {
    const [navbarActive, setNavbarActive] = useState(false);

    const toggleNavbar = () => {
        setNavbarActive(!navbarActive);
    };

    const handleUserBtnClick = () => {                      // for toggling profile
        const profile = document.querySelector('.profile');
        profile.classList.toggle('active');
    }

    return (
        <div>
            {/* <!-- header section --> */}
            <section className="header">
                <div className="flex">
                    <a href="#home" className="logo">Versatile Lodge</a>
                    <div className="menu fas fa-bars" id="menu-btn"></div>
                </div>

                <nav className="navbar">
                    <a href="./">Home</a>
                    <a href="./about">About</a>
                    <a href="./rooms">Rooms</a>
                    <a href="./contact">Contact</a>
                    <a href="./reviews" className="active">Reviews</a>
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

            {/* <!-- reviews-heading section --> */}
            <section className="reviews-heading">

                <h1>--- Reviews ---</h1>

            </section>


            {/* <!-- scrollable reviews --> */}


            <div className="reviews-container">
                <div className="review">
                    <div className="review-left">
                        <img src="/assets/images/pic-1.png" alt="" />
                        <h3>John Doe</h3>
                    </div>
                    <div className="review-right">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit?</p>
                        <p>Date: October 10, 2023</p>
                    </div>
                </div>
                <div className="review">
                    <div className="review-left">
                        <img src="/assets/images/pic-2.png" alt="" />
                        <h3>John Doe</h3>
                    </div>
                    <div className="review-right">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit?</p>
                        <p>Date: October 10, 2023</p>
                    </div>
                </div>
                <div className="review">
                    <div className="review-left">
                        <img src="/assets/images/pic-3.png" alt="" />
                        <h3>John Doe</h3>
                    </div>
                    <div className="review-right">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit?</p>
                        <p>Date: October 10, 2023</p>
                    </div>
                </div>
                <div className="review">
                    <div className="review-left">
                        <img src="/assets/images/pic-4.png" alt="" />
                        <h3>John Doe</h3>
                    </div>
                    <div className="review-right">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit? dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit? dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit?</p>
                        <p>Date: October 10, 2023</p>
                    </div>
                </div>
                <div className="review">
                    <div className="review-left">
                        <img src="/assets/images/pic-5.png" alt="" />
                        <h3>John Doe</h3>
                    </div>
                    <div className="review-right">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit?</p>
                        <p>Date: October 10, 2023</p>
                    </div>
                </div>
                <div className="review">
                    <div className="review-left">
                        <img src="/assets/images/pic-6.png" alt="" />
                        <h3>John Doe</h3>
                    </div>
                    <div className="review-right">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit?</p>
                        <p>Date: October 10, 2023</p>
                    </div>
                </div>
                <div className="review">
                    <div className="review-left">
                        <img src="/assets/images/pic-2.png" alt="" />
                        <h3>John Doe</h3>
                    </div>
                    <div className="review-right">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit?</p>
                        <p>Date: October 10, 2023</p>
                    </div>
                </div>
                <div className="review">
                    <div className="review-left">
                        <img src="/assets/images/pic-1.png" alt="" />
                        <h3>John Doe</h3>
                    </div>
                    <div className="review-right">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit? laborum ex praesentium fugit?</p>
                        <p>Date: October 10, 2023</p>
                    </div>
                </div>
                <div className="review">
                    <div className="review-left">
                        <img src="/assets/images/pic-8.jpg" alt="" />
                        <h3>John Doe</h3>
                    </div>
                    <div className="review-right">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit?</p>
                        <p>Date: October 10, 2023</p>
                    </div>
                </div>
                <div className="review">
                    <div className="review-left">
                        <img src="/assets/images/pic-3.png" alt="" />
                        <h3>John Doe</h3>
                    </div>
                    <div className="review-right">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit? the qerasf</p>
                        <p>Date: October 10, 2023</p>
                    </div>
                </div>
                {/* <!-- Repeat this structure for additional reviews --> */}
            </div>

            <Footer />


        </div>
    );
};

export default Reviews;
