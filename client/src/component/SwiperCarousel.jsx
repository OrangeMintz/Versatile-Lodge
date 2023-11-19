import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swiper from 'swiper/bundle';

const SwiperCarousel = () => {
  useEffect(() => {
    const swiper = new Swiper(".home-slider", {
      loop: true,
      effect: "coverflow",
      spaceBetween: 30,
      grabCursor: true,
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }, []);

  return (
    <section className="home" id="home">
      <div className="swiper home-slider">
        <div className="swiper-wrapper">
          <div className="box swiper-slide">
            <img src="assets/images/home-img-1.jpg" alt="" />
            <div className="flex">
              <h3> Malaybalay</h3>
              <Link to="/room" className="btn">
                Check Room
              </Link>
            </div>
          </div>

          <div className="box swiper-slide">
            <img src="assets/images/home-img-2.jpg" alt="" />
            <div className="flex">
              <h3>Valencia</h3>
              <Link to="/room" className="btn">
                Check Room
              </Link>
            </div>
          </div>

          <div className="box swiper-slide">
            <img src="assets/images/home-img-3.jpg" alt="" />
            <div className="flex">
              <h3>Maramag</h3>
              <Link to="/room" className="btn">
                Check Room
              </Link>
            </div>
          </div>
        </div>

        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </div>
    </section>
  );
}

export default SwiperCarousel;