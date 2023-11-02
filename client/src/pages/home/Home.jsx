import React, { useState } from 'react';

const Home = () => {
  const [navbarActive, setNavbarActive] = useState(false);

  const toggleNavbar = () => {
    setNavbarActive(!navbarActive);
  };

  return (
    <div>
      <section className="header">
        <div className="flex">
          <a href="#home" className="logo">
            Versatile Lodge
          </a>
          <a href="#availability" className="btn">
            check availability
          </a>
          <div
            className={`menu fas fa-bars ${navbarActive ? 'active' : ''}`}
            id="menu-btn"
            onClick={toggleNavbar}
          ></div>
        </div>

        <nav className={`navbar ${navbarActive ? 'active' : ''}`}>
          <a href="./" className="active">Home</a>
          <a href="./about">About</a>
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

      <section className="home" id="home">
        <div className="swiper home-slider">
          <div className="swiper-wrapper">
            <div className="box swiper-slide">
              <img src="/assets/images/home-img-1.jpg" alt="" />
              <div className="flex">
                <h3>Malaybalay Room 1</h3>
              </div>
            </div>
            <div className="box swiper-slide">
              <img src="/assets/images/home-img-2.jpg" alt="" />
              <div className="flex">
                <h3>foods and drinks</h3>
              </div>
            </div>

            <div className="box swiper-slide">
              <img src="/assets/images/home-img-3.jpg" alt="" />
              <div className="flex">
                <h3>luxurious halls</h3>
              </div>
            </div>
          </div>

          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
        </div>
      </section>

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
                <option value="5">5 Adults</option>
              </select>
            </div>
            <div className="box">
              <p>
                childs<span>*</span>
              </p>
              <select name="childs" className="input" required>
                <option value="-">0 Child</option>
                <option value="1">1 Child</option>
                <option value="2">2 Childs</option>
                <option value="3">3 Childs</option>1
                <option value="4">4 Childs</option>
                <option value="5">5 Childs</option>
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

      <section className="gallery" id="gallery">
        <div className="swiper gallery-slider">
          <div className="swiper-wrapper">
            <img
              src="/assets/images/gallery-img-1.jpg"
              className="swiper-slide"
              alt=""
            />
            <img
              src="/assets/images/gallery-img-2.webp"
              className="swiper-slide"
              alt=""
            />
            <img
              src="/assets/images/gallery-img-3.webp"
              className="swiper-slide"
              alt=""
            />
            <img
              src="/assets/images/gallery-img-4.webp"
              className="swiper-slide"
              alt=""
            />
            <img
              src="/assets/images/gallery-img-5.webp"
              className="swiper-slide"
              alt=""
            />
            <img
              src="/assets/images/gallery-img-6.webp"
              className="swiper-slide"
              alt=""
            />
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </section>

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
              <i className="fas fa-envelope"></i>VersatileLodge@gmail.com
            </a>
            <a href="#">
              <i className="fas fa-map-marker-alt"></i>Valencia, Bukidnon - 8709
            </a>
          </div>
          <div className="box">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#reservation">Rooms</a>
            <a href="#gallery">Contact</a>
            <a href="#reviews">Reviews</a>
          </div>
          <div className="box">
            <a href="#">
              Facebook<i className="fab fa-facebook"></i>
            </a>
            <a href="#">
              Youtube<i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>

        <div className="credit">
          &copy; Copyright @ 2023 by Versatile-Lodge | All Rights Reserved!
        </div>
      </section>
    </div>
  );
};

export default Home;
