import { useState } from "react";
import { useEffect } from "react";

import axios from "axios";

const RoomDetail = () => {
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
        <section class="header">
            <div class="flex">
                <a href="#home" class="logo">Versatile Lodge</a>
                <a href="#availability" class="btn">Check availability</a>
                <div class="menu fas fa-bars" id="menu-btn"></div>
            </div>

            <nav class="navbar">
                <a href="./">Home</a>
                <a href="./about">About</a>
                <a href="./rooms" className="active">Rooms</a>
                <a href="./contact">Contact</a>
                <a href="./reviews">Reviews</a>
                <img src="assets/images/user4.jpg" id="user-btn" alt="user" onClick={handleUserBtnClick}/>
                {/* <!-- <select id="dropdown">
                    <option value="" selected>Profile</option>
                    <option value="booking-history.html">Booking History</option>
                    <option value="account-setting.html">Account Settings</option>
                    <option value="login.html">Log out</option>
                </select> --> */}
                <div class="profile">
                    <img src="assets/images/user4.jpg" alt=""/>
                    <h3>Anzai Mitsuyoshi</h3>
                    <span>client</span>
                    <a href="accountSetting" class="btn">View Profile</a>
                    <div class="flex-btn">
                        <a href="bookingHistory" class="option-btn">History</a>
                        <a href="login" class="option-btn">Logout</a>
                    </div>
                </div>
            </nav>
        </section>

        {/* <!-- home section--> */}

        <section class="home" id="home">
            
            <div class="swiper home-slider">

                <div class="swiper-wrapper">

                    <div class="box swiper-slide">
                        <img src="/assets/images/home-img-1.jpg" alt=""/>
                        <div class="flex">
                            <h3>Branch MC Room: 13</h3>
                        </div>
                    </div>

                    <div class="box swiper-slide">
                        <img src="/assets/images/home-img-2.jpg" alt=""/>
                        <div class="flex">
                            <h3>inside view</h3>
                        </div>
                    </div>

                    <div class="box swiper-slide">
                        <img src="/assets/images/home-img-3.jpg" alt=""/>
                        <div class="flex">
                            <h3>outside view</h3>
                        </div>
                    </div>

                </div>

                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>

            </div>
        </section>

        {/* <!-- availability section --> */}

        <section class="availability" id="availability">

            <form action="" method="post">
                <div class="flex">
                    <div class="box">
                        <p>check in <span>*</span></p>
                        <input type="date" name="check_in" class="input" required/>
                    </div>
                    <div class="box">
                        <p>check out <span>*</span></p>
                        <input type="date" name="check_out" class="input" required/>
                    </div>
                    <div class="box">
                        <p>adults<span>*</span></p>
                        <select name="adults" class="input" required>
                            <option value="1">1 adult</option>
                            <option value="2">2 adults</option>
                            <option value="3">3 adults</option>
                            <option value="4">4 adults</option>
                            <option value="5">5 adults</option>
                            <option value="6">6 adults</option>
                        </select>
                    </div>
                    <div class="box">
                        <p>childs<span>*</span></p>
                        <select name="childs" class="input" required>
                            <option value="-">0 child</option>
                            <option value="1">1 child</option>
                            <option value="2">2 childs</option>
                            <option value="3">3 childs</option>
                            <option value="4">4 childs</option>
                            <option value="5">5 childs</option>
                            <option value="6">6 childs</option>
                        </select>
                    </div>
                    <div class="box">
                        <p>rooms<span>*</span></p>
                        <select name="rooms" class="input" required>
                            <option value="1">1 room</option>
                            <option value="2">2 rooms</option>
                            <option value="3">3 rooms</option>
                            <option value="4">4 rooms</option>
                            <option value="5">5 rooms</option>
                            <option value="6">6 rooms</option>
                        </select>
                    </div>
                </div>

                <p class="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis praesentium, distinctio rerum sequi error, quas sunt delectus aperiam officia soluta molestiae quibusdam similique molestias ab voluptas saepe exercitationem aspernatur quisquam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis praesentium, distinctio rerum sequi error, quas sunt delectus aperiam officia soluta molestiae quibusdam similique molestias ab voluptas saepe exercitationem aspernatur quisquam.
                </p>

                <a href="" class="btn">book now</a>
            </form>

        </section>

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
}

export default RoomDetail;
