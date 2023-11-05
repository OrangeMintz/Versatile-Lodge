import { useState } from "react";
import { useEffect } from "react";
import "./contact.css";


import axios from "axios";

const Contact = () => {
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
                <a href="#availability" className="btn">Check availability</a>
                <div className="menu fas fa-bars" id="menu-btn"></div>
            </div>

            <nav className="navbar">
                <a href="/">Home</a>
                <a href="./about">About</a>
                <a href="./rooms">Rooms</a>
                <a href="./contact" className="active">Contact</a>
                <a href="./reviews">Reviews</a>
                <img src="assets/images/user4.jpg" id="user-btn" alt="user" onClick={handleUserBtnClick}/>
                {/* <!-- <select id="dropdown">
                    <option value="" selected>Profile</option>
                    <option value="booking-history.html">Booking History</option>
                    <option value="account-setting.html">Account Settings</option>
                    <option value="login.html">Log out</option>
                </select> --> */}
                <div className="profile">
                    <img src="assets/images/user4.jpg" alt=""/>
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

        {/* <!-- contact-heading section --> */}
        <section className="contact-heading">

            <h1>--- Contact Us ---</h1>

            <img src="assets/images/map.png" alt=""/>


            
        </section>

        {/* <!-- contact section --> */}
        <section className="contact" id="contact">

            <div className="row">

                <form action="" method="post">
                    <h3>send us message</h3>
                    <input type="text" name="name" required maxLength="50" placeholder="enter your name" className="box"/>
                    <input type="email" name="email" required maxLength="50" placeholder="enter your email" className="box"/>
                    <input type="number" name="number" required maxLength="10" min="0" max="99999999" placeholder="enter your number" className="box"/>
                    <textarea name="msg" className="box" required maxLength="1000" placeholder="enter your message" cols="30" rows="10"></textarea>
                    <input type="submit" value="send message" name="send" className="btn"/>
                </form>

                <div className="faq">
                    <h3 className="title">frequently asked questions</h3>
                    <div className="box">
                        <h3>how to cancel?</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut voluptate vitae temporibus quis necessitatibus quos provident atque sapiente aperiam illum iusto fugiat  tenetur in cupiditate magni?</p>
                    </div>
                    <div className="box">
                        <h3>is there any vacancy?</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut voluptate vitae temporibus quis necessitatibus quos provident atque sapiente aperiam illum iusto fugiat  tenetur in cupiditate magni?</p>
                    </div>
                    <div className="box">
                        <h3>what are payment methods?</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut voluptate vitae temporibus quis necessitatibus quos provident atque sapiente aperiam illum iusto fugiat  tenetur in cupiditate magni?</p>
                    </div>
                    <div className="box">
                        <h3>how to claim coupons codes?</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut voluptate vitae temporibus quis necessitatibus quos provident atque sapiente aperiam illum iusto fugiat  tenetur in cupiditate magni?</p>
                    </div>
                    <div className="box">
                        <h3>what are the age requirements?</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut voluptate vitae temporibus quis necessitatibus quos provident atque sapiente aperiam illum iusto fugiat  tenetur in cupiditate magni?</p>
                    </div>
                    <div className="swiper-pagination"></div>
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
}

export default Contact;
