import { useState } from "react";
import { useEffect } from "react";
import './about.css';

import axios from "axios";

const About = () => {
  const [navbarActive, setNavbarActive] = useState(false);

  const toggleNavbar = () => {
    setNavbarActive(!navbarActive);
  };

  const handleUserBtnClick = () => {                      // for toggling profile
    const profile = document.querySelector('.profile');
    profile.classList.toggle('active');
  }

  return (
    
    <div className="About">
{/* <!-- header section --> */}
      <section className="header">
          <div className="flex">
              <a href="#home" className="logo">Versatile Lodge</a>
              <a href="#availability" className="btn">Check availability</a>
              <div className="menu fas fa-bars" id="menu-btn"></div>
          </div>
          <nav className={`navbar ${navbarActive ? 'active' : ''}`}>
              <a href="./">Home</a>
              <a href="./about" className="active">About</a>
              <a href="./rooms">Rooms</a>
              <a href="./contact">Contact</a>
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

      {/* <!-- about-us section --> */}
      <section className="about-us">

          <h1>--- About Us ---</h1>

          <h2>Welcome to Versatile</h2>

          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt fuga minus veritatis ipsa et sequi obcaecati eum impedit, quas culpa aliquid nesciunt blanditiis esse voluptatibus ipsam nisi dolorum corrupti vero?Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt fuga minus veritatis ipsa et sequi obcaecati eum impedit, quas culpa aliquid nesciunt blanditiis esse voluptatibus ipsam nisi dolorum corrupti vero?Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt fuga minus veritatis ipsa et sequi obcaecati eum impedit, quas culpa aliquid nesciunt blanditiis esse voluptatibus ipsam nisi dolorum corrupti vero?ipsa et sequi obcaecati eum impedit, quas culpa aliquid nesciunt blanditiis esse voluptatibus ipsam nisi dolorum corrupti vero?Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt fuga minus veritatis ipsa et sequi obcaecati eum impedit, quas culpa aliquid nesciunt blanditiis esse voluptatibus ipsam nisi dolorum corrupti vero?</p>

      </section>


      {/* <!-- service section --> */}

      <section className="services">

          <div className="box-container">

              <div className="box">
                  <img src="/assets/images/icon-1.png" alt=""/>
                  <h3>Easy to Access</h3>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit iste facere beatae.</p>
              </div>

              <div className="box">
                  <img src="/assets/images/icon-2.png" alt=""/>
                  <h3>Nature Views</h3>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit iste facere beatae.</p>
              </div>

              <div className="box">
                  <img src="/assets/images/icon-3.png" alt=""/>
                  <h3>Eco Friendly</h3>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit iste facere beatae.</p>
              </div>

              <div className="box">
                  <img src="/assets/images/icon-4.png" alt=""/>
                  <h3>Safety and Security</h3>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit iste facere beatae.</p>
              </div>

              <div className="box">
                  <img src="/assets/images/icon-5.png" alt=""/>
                  <h3>Peaceful Environment</h3>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit iste facere beatae.</p>
              </div>

              <div className="box">
                  <img src="/assets/images/icon-6.png" alt=""/>
                  <h3>Cozy Rooms</h3>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit iste facere beatae.</p>
              </div>
          </div>
      </section>


      {/* <!-- reviews section --> */}

      <section className="reviews" id="reviews">

          <div className="swiper reviews-slider">

              <div className="swiper-wrapper">
                  <div className="swiper-slide box">
                      <img src="/assets/images/pic-1.png" alt=""/>
                      <h3>John Doe</h3>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit?</p>
                  </div>
                  <div className="swiper-slide box">
                      <img src="/assets/images/pic-2.png" alt=""/>
                      <h3>John Doe</h3>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit?</p>
                  </div>
                  <div className="swiper-slide box">
                      <img src="/assets/images/pic-3.png" alt=""/>
                      <h3>John Doe</h3>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit?</p>
                  </div>
                  <div className="swiper-slide box">
                      <img src="/assets/images/pic-4.png" alt=""/>
                      <h3>John Doe</h3>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit?</p>
                  </div>
                  <div className="swiper-slide box">
                      <img src="/assets/images/pic-5.png" alt=""/>
                      <h3>John Doe</h3>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit?</p>
                  </div>
                  <div className="swiper-slide box">
                      <img src="/assets/images/pic-6.png" alt=""/>
                      <h3>John Doe</h3>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit?</p>
                  </div>
                  
              </div>
              <div className="swiper-pagination"></div>
              
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

export default About;
