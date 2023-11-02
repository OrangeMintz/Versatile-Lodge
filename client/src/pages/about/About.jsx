import { useState } from "react";
import { useEffect } from "react";
import './about.css';

import axios from "axios";

const About = () => {
  const [navbarActive, setNavbarActive] = useState(false);

  const toggleNavbar = () => {
    setNavbarActive(!navbarActive);
  };

  return (
    
    <div className="About">
{/* <!-- header section --> */}
      <section class="header">
          <div class="flex">
              <a href="#home" class="logo">Versatile Lodge</a>
              <a href="#availability" class="btn">Check availability</a>
              <div class="menu fas fa-bars" id="menu-btn"></div>
          </div>
          <nav className={`navbar ${navbarActive ? 'active' : ''}`}>
              <a href="./">Home</a>
              <a href="./about" className="active">About</a>
              <a href="./rooms">Rooms</a>
              <a href="./contact">Contact</a>
              <a href="./reviews">Reviews</a>
              <img src="assets/images/user4.jpg" id="user-btn" alt="user"/>
              {/* <!-- <select id="dropdown">
                  <option value="" selected>Profile</option>
                  <option value="booking-history.html">Booking History</option>
                  <option value="account-setting.html">Account Settings</option>
                  <option value="login.html">Log out</option>
              </select> --> */}
              <div class="profile">
                  <img src="assets/images/user4.jpg" alt=""/>
                  <h3>Anzai Mitsuyoshi</h3>
                  <span>teacher</span>
                  <a href="account-setting.html" class="btn">view profile</a>
                  <div class="flex-btn">
                      <a href="booking-history.html" class="option-btn">history</a>
                      <a href="login.html" class="option-btn">logout</a>
                  </div>
              </div> 
          </nav>
      </section>

      {/* <!-- about-us section --> */}
      <section class="about-us">

          <h1>--- About Us ---</h1>

          <h2>Welcome to Versatile</h2>

          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt fuga minus veritatis ipsa et sequi obcaecati eum impedit, quas culpa aliquid nesciunt blanditiis esse voluptatibus ipsam nisi dolorum corrupti vero?Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt fuga minus veritatis ipsa et sequi obcaecati eum impedit, quas culpa aliquid nesciunt blanditiis esse voluptatibus ipsam nisi dolorum corrupti vero?Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt fuga minus veritatis ipsa et sequi obcaecati eum impedit, quas culpa aliquid nesciunt blanditiis esse voluptatibus ipsam nisi dolorum corrupti vero?ipsa et sequi obcaecati eum impedit, quas culpa aliquid nesciunt blanditiis esse voluptatibus ipsam nisi dolorum corrupti vero?Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt fuga minus veritatis ipsa et sequi obcaecati eum impedit, quas culpa aliquid nesciunt blanditiis esse voluptatibus ipsam nisi dolorum corrupti vero?</p>

      </section>


      {/* <!-- service section --> */}

      <section class="services">

          <div class="box-container">

              <div class="box">
                  <img src="/assets/images/icon-1.png" alt=""/>
                  <h3>Easy to Access</h3>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit iste facere beatae.</p>
              </div>

              <div class="box">
                  <img src="/assets/images/icon-2.png" alt=""/>
                  <h3>Nature Views</h3>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit iste facere beatae.</p>
              </div>

              <div class="box">
                  <img src="/assets/images/icon-3.png" alt=""/>
                  <h3>Eco Friendly</h3>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit iste facere beatae.</p>
              </div>

              <div class="box">
                  <img src="/assets/images/icon-4.png" alt=""/>
                  <h3>Safety and Security</h3>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit iste facere beatae.</p>
              </div>

              <div class="box">
                  <img src="/assets/images/icon-5.png" alt=""/>
                  <h3>Peaceful Environment</h3>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit iste facere beatae.</p>
              </div>

              <div class="box">
                  <img src="/assets/images/icon-6.png" alt=""/>
                  <h3>Cozy Rooms</h3>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit iste facere beatae.</p>
              </div>
          </div>
      </section>


      {/* <!-- reviews section --> */}

      <section class="reviews" id="reviews">

          <div class="swiper reviews-slider">

              <div class="swiper-wrapper">
                  <div class="swiper-slide box">
                      <img src="/assets/images/pic-1.png" alt=""/>
                      <h3>John Doe</h3>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit?</p>
                  </div>
                  <div class="swiper-slide box">
                      <img src="/assets/images/pic-2.png" alt=""/>
                      <h3>John Doe</h3>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit?</p>
                  </div>
                  <div class="swiper-slide box">
                      <img src="/assets/images/pic-3.png" alt=""/>
                      <h3>John Doe</h3>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit?</p>
                  </div>
                  <div class="swiper-slide box">
                      <img src="/assets/images/pic-4.png" alt=""/>
                      <h3>John Doe</h3>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit?</p>
                  </div>
                  <div class="swiper-slide box">
                      <img src="/assets/images/pic-5.png" alt=""/>
                      <h3>John Doe</h3>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit?</p>
                  </div>
                  <div class="swiper-slide box">
                      <img src="/assets/images/pic-6.png" alt=""/>
                      <h3>John Doe</h3>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit?</p>
                  </div>
                  
              </div>
              <div class="swiper-pagination"></div>
              
          </div>

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

export default About;
