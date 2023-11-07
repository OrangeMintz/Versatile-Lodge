import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Footer from '../../component/footer';
import SwiperCarousel from '../../component/SwiperCarousel'
import SwiperGallery from '../../component/SwiperGallery';
import { useContext } from 'react';
import AuthContext from '../../context/AuthProvider';

const Home = () => {

  const { setAuth } = useContext(AuthContext)
  const navigate = useNavigate()

  // STIL PROBLEM IN LOGGING IN, OUT AND NAVIGATING
  const logout = async () => {
    // if used in more components, this should be in context 
    // axios to /logout endpoint 
    setAuth({});
    navigate('/about');
  }

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
      <section className="header">
        <div className="flex">
          <Link to="/" className="logo">Versatile Lodge</Link>
          <div
            className={`menu fas fa-bars ${navbarActive ? 'active' : ''}`}
            id="menu-btn"
            onClick={toggleNavbar}
          ></div>
        </div>

        <nav className={`navbar ${navbarActive ? 'active' : ''}`}>
          <Link to="#" className='active'>Home</Link>
          <Link to="/about" >About</Link>
          <Link to="/rooms" >Rooms</Link>
          <Link to="/contact" >Contact</Link>
          <Link to="/reviews" >Reviews</Link>
          <Link to="/protected" >Protected</Link>

          <img
            src="assets/images/user4.jpg"
            id="user-btn"
            alt="user"
            onClick={handleUserBtnClick}
          />
          <div className="profile">
            <img src="assets/images/user4.jpg" alt="" />
            <h3>Anzai Mitsuyoshi</h3>
            <span>Client</span>
            <Link to="/accountSetting" className='btn'>View Profile</Link>
            <div className="flex-btn">
              <Link to="/bookingHistory" className='option-btn'>History</Link>
              <Link className='option-btn' onClick={logout}>Logout</Link>
            </div>
          </div>
        </nav>
      </section>


      <SwiperCarousel />

      <section className="availability" id="availability">
        <form action="" method="post">
          <div className="flex">
            <div className="box">
              <p>
                Check In<span>*</span>
              </p>
              <input type="date" name="check_in" className="input" required />
            </div>
            <div className="box">
              <p>
                Check Out<span>*</span>
              </p>
              <input type="date" name="check_out" className="input" required />
            </div>
            <div className="box">
              <p>
                Adults<span>*</span>
              </p>
              <select name="adults" className="input" required>
                <option value="1">1 Adult</option>
                <option value="2">2 Adults</option>
                <option value="3">3 Adults</option>
                <option value="4">4 Adults</option>
              </select>
            </div>
            <div className="box">
              <p>
                Childs<span>*</span>
              </p>
              <select name="childs" className="input" required>
                <option value="">None</option>
                <option value="1">1 Child</option>
                <option value="2">2 Childs</option>
                <option value="3">3 Childs</option>
              </select>
            </div>
            <div className="box">
              <p>
                Branch<span>*</span>
              </p>
              <select name="branch" className="input" required>
                <option value="Valencia">Valencia</option>
                <option value="Malaybalay">Malaybalay</option>
                <option value="Maramag">Maramag</option>
              </select>
            </div>
          </div>
          <input
            type="text"
            value="check availability"
            name="check"
            className="btn"
          />
        </form>
      </section>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <section className="services">
        <div className="box-container">
          <div className="box">
            <img src="/assets/images/icon-3.png" alt="" />
            <h3>food & drinks</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
              iste facere beatae.
            </p>
          </div>

          <div className="box">
            <img src="/assets/images/icon-2.png" alt="" />
            <h3>outdoor dining</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
              iste facere beatae.
            </p>
          </div>

          <div className="box">
            <img src="/assets/images/icon-3.png" alt="" />
            <h3>brach views</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
              iste facere beatae.
            </p>
          </div>

          <div className="box">
            <img src="/assets/images/icon-5.png" alt="" />
            <h3>decorations</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
              iste facere beatae.
            </p>
          </div>

          <div className="box">
            <img src="/assets/images/icon-4.png" alt="" />
            <h3>swimming pool</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
              iste facere beatae.
            </p>
          </div>

          <div className="box">
            <img src="/assets/images/icon-5.png" alt="" />
            <h3>resort beach</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
              iste facere beatae.
            </p>
          </div>
        </div>
      </section>

      <SwiperGallery />

      <section className="contact" id="contact">
        <div className="row">
          <form action="" method="post">
            <h3>send us message</h3>
            <input
              type="text"
              name="name"
              required
              maxLength="50"
              placeholder="enter your name"
              className="box"
            />
            <input
              type="email"
              name="email"
              required
              maxLength="50"
              placeholder="enter your email"
              className="box"
            />
            <input
              type="number"
              name="number"
              required
              maxLength="10"
              min="0"
              max="99999999"
              placeholder="enter your number"
              className="box"
            />
            <textarea
              name="msg"
              className="box"
              required
              maxLength="1000"
              placeholder="enter your message"
              cols="30"
              rows="10"
            ></textarea>
            <input
              type="submit"
              value="send message"
              name="send"
              className="btn"
            />
          </form>
          <div className="faq">
            <h3 className="title">Frequently Asked Questions</h3>
            <div className="box">
              <h3>How to cancel?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                voluptate vitae temporibus quis necessitatibus quos provident
                atque sapiente aperiam illum iusto fugiat tenetur in cupiditate
                magni?
              </p>
            </div>
            <div className="box">
              <h3>Is there any vacancy?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                voluptate vitae temporibus quis necessitatibus quos provident
                atque sapiente aperiam illum iusto fugiat tenetur in cupiditate
                magni?
              </p>
            </div>
            <div className="box">
              <h3>What are payment methods?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                voluptate vitae temporibus quis necessitatibus quos provident
                atque sapiente aperiam illum iusto fugiat tenetur in cupiditate
                magni?
              </p>
            </div>
            <div className="box">
              <h3>How to claim coupons codes?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                voluptate vitae temporibus quis necessitatibus quos provident
                atque sapiente aperiam illum iusto fugiat tenetur in cupiditate
                magni?
              </p>
            </div>
            <div className="box">
              <h3>What are the age requirements?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                voluptate vitae temporibus quis necessitatibus quos provident
                atque sapiente aperiam illum iusto fugiat tenetur in cupiditate
                magni?
              </p>
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
