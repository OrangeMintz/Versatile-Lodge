// Header.js

import React from 'react';

const Header = ({ navbarActive, toggleNavbar, handleUserBtnClick }) => {

    
  return (
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
        <a href="./" className="active">
          Home
        </a>
        <a href="./about">About</a>
        <a href="./rooms">Rooms</a>
        <a href="./contact">Contact</a>
        <a href="./reviews">Reviews</a>
        <img
          src="assets/images/user4.jpg"
          id="user-btn"
          alt="user"
          onClick={handleUserBtnClick}
        />
        <div className="profile">
          <img src="assets/images/user4.jpg" alt="" />
          <h3>Anzai Mitsuyoshi</h3>
          <span>teacher</span>
          <a href="account-setting.html" className="btn">
            View Profile
          </a>
          <div className="flex-btn">
            <a href="booking-history.html" className="option-btn">
              History
            </a>
            <a href="login.html" className="option-btn">
              Logout
            </a>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Header;