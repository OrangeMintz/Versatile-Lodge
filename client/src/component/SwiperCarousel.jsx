import React, { useEffect } from 'react';
import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

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
                <h3>Branch MC Room: 13</h3>
              </div>
            </div>
  
            <div className="box swiper-slide">
              <img src="assets/images/home-img-2.jpg" alt="" />
              <div className="flex">
                <h3>foods and drinks</h3>
                <a href="reservation" className="btn">
                  make a reservation
                </a>
              </div>
            </div>
  
            <div className="box swiper-slide">
              <img src="assets/images/home-img-3.jpg" alt="" />
              <div className="flex">
                <h3>luxurious halls</h3>
                <a href="contact" className="btn">
                  Book Now
                </a>
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