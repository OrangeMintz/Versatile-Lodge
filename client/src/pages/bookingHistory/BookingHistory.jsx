import React, { useState } from 'react';
import "./bookingHistory.css"
import Footer from '../../component/footer';

const BookingHistory = () => {

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

      {/* Booking History section */}
      <section className="booking-history">
        <h1>---Booking History---</h1>

        <table>
          <tr>
            <th>Booking ID</th>
            <th>Date</th>
            <th>Room#</th>
            <th>Branch</th>
            <th>Amount</th>
          </tr>
          <tr>
            <td>1</td>
            <td>2023-10-15</td>
            <td>101</td>
            <td>Branch A</td>
            <td>$150.00</td>
          </tr>
          <tr>
            <td>2</td>
            <td>2023-10-16</td>
            <td>203</td>
            <td>Branch B</td>
            <td>$200.00</td>
          </tr>
          <tr>
            <td>3</td>
            <td>2023-10-17</td>
            <td>305</td>
            <td>Branch C</td>
            <td>$175.00</td>
          </tr>
        </table>
      </section>

      <Footer />

    </div>
  );
};

export default BookingHistory;