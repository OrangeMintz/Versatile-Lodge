import React, { useState } from 'react';
import "./reviews.css";

const Reviews = () => {
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
                <a href="./rooms">Rooms</a>
                <a href="./contact">Contact</a>
                <a href="./reviews" className="active">Reviews</a>
                <img src="/assets/images/user4.jpg" id="user-btn" alt="user"/>
                {/* <!-- <select id="dropdown">
                    <option value="" selected>Profile</option>
                    <option value="booking-history.html">Booking History</option>
                    <option value="account-setting.html">Account Settings</option>
                    <option value="login.html">Log out</option>
                </select> --> */}
                <div className="profile">
                    <img src="/assets/images/user4.jpg" alt=""/>
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

        {/* <!-- reviews-heading section --> */}
        <section class="reviews-heading">

            <h1>--- Reviews ---</h1>

        </section>


        {/* <!-- scrollable reviews --> */}


        <div class="reviews-container">
            <div class="review">
                <div class="review-left">
                    <img src="/assets/images/pic-1.png" alt=""/>
                    <h3>John Doe</h3>
                </div>
                <div class="review-right">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit?</p>
                    <p>Date: October 10, 2023</p>
                </div>
            </div>
            <div class="review">
                <div class="review-left">
                    <img src="/assets/images/pic-2.png" alt=""/>
                    <h3>John Doe</h3>
                </div>
                <div class="review-right">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit?</p>
                    <p>Date: October 10, 2023</p>
                </div>
            </div>
            <div class="review">
                <div class="review-left">
                    <img src="/assets/images/pic-3.png" alt=""/>
                    <h3>John Doe</h3>
                </div>
                <div class="review-right">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit?</p>
                    <p>Date: October 10, 2023</p>
                </div>
            </div>
            <div class="review">
                <div class="review-left">
                    <img src="/assets/images/pic-4.png" alt=""/>
                    <h3>John Doe</h3>
                </div>
                <div class="review-right">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit? dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit? dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit?</p>
                    <p>Date: October 10, 2023</p>
                </div>
            </div>
            <div class="review">
                <div class="review-left">
                    <img src="/assets/images/pic-5.png" alt=""/>
                    <h3>John Doe</h3>
                </div>
                <div class="review-right">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit?</p>
                    <p>Date: October 10, 2023</p>
                </div>
            </div>
            <div class="review">
                <div class="review-left">
                    <img src="/assets/images/pic-6.png" alt=""/>
                    <h3>John Doe</h3>
                </div>
                <div class="review-right">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit?</p>
                    <p>Date: October 10, 2023</p>
                </div>
            </div>
            <div class="review">
                <div class="review-left">
                    <img src="/assets/images/pic-2.png" alt=""/>
                    <h3>John Doe</h3>
                </div>
                <div class="review-right">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit?</p>
                    <p>Date: October 10, 2023</p>
                </div>
            </div>
            <div class="review">
                <div class="review-left">
                    <img src="/assets/images/pic-1.png" alt=""/>
                    <h3>John Doe</h3>
                </div>
                <div class="review-right">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit? laborum ex praesentium fugit?</p>
                    <p>Date: October 10, 2023</p>
                </div>
            </div>
            <div class="review">
                <div class="review-left">
                    <img src="/assets/images/pic-8.jpg" alt=""/>
                    <h3>John Doe</h3>
                </div>
                <div class="review-right">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit?</p>
                    <p>Date: October 10, 2023</p>
                </div>
            </div>
            <div class="review">
                <div class="review-left">
                    <img src="/assets/images/pic-3.png" alt=""/>
                    <h3>John Doe</h3>
                </div>
                <div class="review-right">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit? the qerasf</p>
                    <p>Date: October 10, 2023</p>
                </div>
            </div>
            {/* <!-- Repeat this structure for additional reviews --> */}
        </div>

        {/* <!-- footer section--> */}

        <section class="footer">

            <div class="box-container">

                <div class="box">
                    <a href="tel:1234567890"><i class="fas fa-phone"></i>+123-456-7890</a>
                    <a href="tel:1111122333"><i class="fas fa-phone"></i>+111-226-3333</a>
                    <a href="mailto:example@gmail.com"><i class="fas fa-envelope"></i>example@gmail.com</a>
                    <a href="#"><i class="fas fa-map-marker-alt"></i>Malaybalay, Bukidnon - 8700</a>
                </div>
                <div class="box">
                    <a href="#home">home</a>
                    <a href="#reservation">reservation</a>
                    <a href="#gallery">gallery</a>
                    <a href="#contact">contact</a>
                    <a href="#reviews">reviews</a>
                </div>
                <div class="box">
                    <a href="#">Facebook<i class='fab fa-facebook'></i></a>
                    <a href="#">Twitter<i class="fab fa-twitter"></i></a>
                    <a href="#">Instagram<i class="fab fa-instagram"></i></a>
                    <a href="#">LinkedIn<i class="fab fa-linkedin"></i></a>
                    <a href="#">Youtube<i class="fab fa-youtube"></i></a>
                </div>
            </div>

            <div class="credit">&copy; copyright @ 2023 by BSIT-3B | all rights reserved!</div>

        </section>
        

    </div> 
    );
};

export default Reviews;
