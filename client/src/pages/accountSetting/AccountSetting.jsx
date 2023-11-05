import React, { useState } from 'react';
import "./accountSetting.css";

const AccountSetting = () => {

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
      {/* Header section */}
      <section className="header">
        <div className="flex">
          <a href="#home" className="logo">
            Versatile Lodge
          </a>
          <a href="#availability" className="btn">
            Check availability
          </a>
          <div
            className={`menu fas fa-bars ${navbarActive ? 'active' : ''}`}
            id="menu-btn"
            onClick={toggleNavbar}
          ></div>
        </div>

        <nav className={`navbar ${navbarActive ? 'active' : ''}`}>
          <a href="./">Home</a>
          <a href="./about">About</a>
          <a href="./rooms">Rooms</a>
          <a href="./contact">Contact</a>
          <a href="./reviews">Reviews</a>
          <img
            src="assets/images/user4.jpg"
            id="user-btn"
            alt="user"
            onClick={handleUserBtnClick}
            className="active"
          />
          <div className="profile">
            <img src="assets/images/user4.jpg" alt="" />
            <h3>Anzai Mitsuyoshi</h3>
            <span>client</span>
            <a href="accountSetting" className="btn">
              View Profile
            </a>
            <div className="flex-btn">
              <a href="bookingHistory" className="option-btn">
                History
              </a>
              <a href="login" className="option-btn">
                Logout
              </a>
            </div>
          </div>
        </nav>
      </section>

      {/* <!-- account-settings section --> */}

      <section className="account-settings">

          <div className="account-menu">
            <div className="profile-picture">
              <img src="assets/images/user4.jpg" alt="Profile Picture"/>
            </div>
            <ul>
              <li><a href="accountSetting"><i className="fas fa-user"></i> Account Details</a></li>
              <li><a href="changePassword"><i className="fas fa-key"></i> Change Password</a></li>
              <li><a href="login"><i className="fas fa-sign-out-alt"></i> Logout</a></li>
            </ul>
          </div>
        
          <div className="settings">
          <h2>Account Settings</h2>
          <form>
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="JohnDoe@student.buksu.edu.ph"
              required
            />

            <label htmlFor="first-name">First Name:</label>
            <input
              type="text"
              id="first-name"
              name="first-name"
              placeholder="John"
              required
            />

            <label htmlFor="last-name">Last Name:</label>
            <input
              type="text"
              id="last-name"
              name="last-name"
              placeholder="Doe"
              required
            />

            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Malaybalay, Bukidnon"
            />

            <button type="submit">Update Profile</button>
          </form>
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

export default AccountSetting;