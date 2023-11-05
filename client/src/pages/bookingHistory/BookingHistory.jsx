import React, {useState} from 'react';
import "./bookingHistory.css"

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

      {/* Footer section */}
      <section className="footer">
        <div className="box-container">
          <div className="box">
            <a href="tel:1234567890">
              <i className="fas fa-phone"></i>+123-456-7890
            </a>
            <a href="tel:1111122333">
              <i className="fas fa-phone"></i>+111-226-3333
            </a>
            <a href="mailto:example@gmail.com">
              <i className="fas fa-envelope"></i>example@gmail.com
            </a>
            <a href="#">
              <i className="fas fa-map-marker-alt"></i>Malaybalay, Bukidnon - 8700
            </a>
          </div>
          <div className="box">
            <a href="#home">home</a>
            <a href="#reservation">reservation</a>
            <a href="#gallery">gallery</a>
            <a href="#contact">contact</a>
            <a href="#reviews">reviews</a>
          </div>
          <div className="box">
            <a href="#">Facebook<i className="fab fa-facebook"></i></a>
            <a href="#">Twitter<i className="fab fa-twitter"></i></a>
            <a href="#">Instagram<i className="fab fa-instagram"></i></a>
            <a href="#">LinkedIn<i className="fab fa-linkedin"></i></a>
            <a href="#">Youtube<i className="fab fa-youtube"></i></a>
          </div>
        </div>
        <div className="credit">
          &copy; copyright @ 2023 by BSIT-3B | all rights reserved!
        </div>
      </section>
    </div>
  );
};

export default BookingHistory;