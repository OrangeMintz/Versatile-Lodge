import React, { useState } from 'react'



export const Home = () => {
  const [navbarActive, setNavbarActive] = useState(false);

  const toggleNavbar = () => {
    setNavbarActive(!navbarActive);
  };

  return (
    <div>
      <section className="header">
        <div className="flex">
          <a href="#home" className="logo">Versatile Lodge</a>
          <a href="#availability" className="btn">check availability</a>
          <div className={`menu fas fa-bars ${navbarActive ? 'active' : ''}`} id="menu-btn" onClick={toggleNavbar}></div>
        </div>

        <nav className={`navbar ${navbarActive ? 'active' : ''} `}>
          <a href="#" className='active'>Home</a>
          <a href="/about">About</a>
          <a href="#reservation">Rooms</a>
          <a href="#gallery">Contact</a>
          <a href="#reviews">Reviews</a>
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

      <section class="availability" id="availability">
        <form action="" method="post">
          <div class="flex">
            <div class="box">
              <p>
                Check In<span>*</span>
              </p>
              <input type="date" name="check_in" class="input" required />
            </div>
            <div class="box">
              <p>
                Check Out<span>*</span>
              </p>
              <input type="date" name="check_out" class="input" required />
            </div>
            <div class="box">
              <p>
                Adults<span>*</span>
              </p>
              <select name="adults" class="input" required>
                <option value="1">1 Adult</option>
                <option value="2">2 Adults</option>
                <option value="3">3 Adults</option>
                <option value="4">4 Adults</option>
                <option value="5">5 Adults</option>
              </select>
            </div>
            <div class="box">
              <p>
                childs<span>*</span>
              </p>
              <select name="childs" class="input" required>
                <option value="-">0 Child</option>
                <option value="1">1 Child</option>
                <option value="2">2 Childs</option>
                <option value="3">3 Childs</option>
                <option value="4">4 Childs</option>
                <option value="5">5 Childs</option>
              </select>
            </div>
            <div class="box">
              <p>
                Branch<span>*</span>
              </p>
              <select name="branch" class="input" required>
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
            class="btn"
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

      <section class="services">
        <div class="box-container">
          <div class="box">
            <img src="/assets/images/icon-3.png" alt="" />
            <h3>food & drinks</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
              iste facere beatae.
            </p>
          </div>

          <div class="box">
            <img src="/assets/images/icon-2.png" alt="" />
            <h3>outdoor dining</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
              iste facere beatae.
            </p>
          </div>

          <div class="box">
            <img src="/assets/images/icon-3.png" alt="" />
            <h3>brach views</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
              iste facere beatae.
            </p>
          </div>

          <div class="box">
            <img src="/assets/images/icon-5.png" alt="" />
            <h3>decorations</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
              iste facere beatae.
            </p>
          </div>

          <div class="box">
            <img src="/assets/images/icon-4.png" alt="" />
            <h3>swimming pool</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
              iste facere beatae.
            </p>
          </div>

          <div class="box">
            <img src="/assets/images/icon-5.png" alt="" />
            <h3>resort beach</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
              iste facere beatae.
            </p>
          </div>
        </div>
      </section>

      <section class="gallery" id="gallery">
        <div class="swiper gallery-slider">
          <div class="swiper-wrapper">
            <img
              src="/assets/images/gallery-img-1.jpg"
              class="swiper-slide"
              alt=""
            />
            <img
              src="/assets/images/gallery-img-2.webp"
              class="swiper-slide"
              alt=""
            />
            <img
              src="/assets/images/gallery-img-3.webp"
              class="swiper-slide"
              alt=""
            />
            <img
              src="/assets/images/gallery-img-4.webp"
              class="swiper-slide"
              alt=""
            />
            <img
              src="/assets/images/gallery-img-5.webp"
              class="swiper-slide"
              alt=""
            />
            <img
              src="/assets/images/gallery-img-6.webp"
              class="swiper-slide"
              alt=""
            />
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </section>

      <section class="contact" id="contact">
        <div class="row">
          <form action="" method="post">
            <h3>send us message</h3>
            <input
              type="text"
              name="name"
              required
              maxlength="50"
              placeholder="enter your name"
              class="box"
            />
            <input
              type="email"
              name="email"
              required
              maxlength="50"
              placeholder="enter your email"
              class="box"
            />
            <input
              type="number"
              name="number"
              required
              maxlength="10"
              min="0"
              max="99999999"
              placeholder="enter your number"
              class="box"
            />
            <textarea
              name="msg"
              class="box"
              required
              maxlength="1000"
              placeholder="enter your message"
              cols="30"
              rows="10"
            ></textarea>
            <input type="submit" value="send message" name="send" class="btn" />
          </form>
          <div class="faq">
            <h3 class="title">Frequently Asked Questions</h3>
            <div class="box">
              <h3>How to cancel?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                voluptate vitae temporibus quis necessitatibus quos provident
                atque sapiente aperiam illum iusto fugiat tenetur in cupiditate
                magni?
              </p>
            </div>
            <div class="box">
              <h3>Is there any vacancy?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                voluptate vitae temporibus quis necessitatibus quos provident
                atque sapiente aperiam illum iusto fugiat tenetur in cupiditate
                magni?
              </p>
            </div>
            <div class="box">
              <h3>What are payment methods?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                voluptate vitae temporibus quis necessitatibus quos provident
                atque sapiente aperiam illum iusto fugiat tenetur in cupiditate
                magni?
              </p>
            </div>
            <div class="box">
              <h3>How to claim coupons codes?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                voluptate vitae temporibus quis necessitatibus quos provident
                atque sapiente aperiam illum iusto fugiat tenetur in cupiditate
                magni?
              </p>
            </div>
            <div class="box">
              <h3>What are the age requirements?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                voluptate vitae temporibus quis necessitatibus quos provident
                atque sapiente aperiam illum iusto fugiat tenetur in cupiditate
                magni?
              </p>
            </div>
            <div class="swiper-pagination"></div>
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

  )
}

export default Home;
