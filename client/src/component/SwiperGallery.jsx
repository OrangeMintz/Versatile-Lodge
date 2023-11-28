import React, { useEffect } from 'react';
import Swiper from 'swiper';

function SwiperGallery() {
  useEffect(() => {
    const swiper = new Swiper('.gallery-slider', {
      loop: true,
      effect: 'coverflow',
      slidesPerView: '2',
      centeredSlides: true,
      grabCursor: true,
      coverflowEffect: {
        rotate: 0,
        depth: 100,
        modifier: 2,
        slideShadows: true,
      },
      pagination: {
        el: '.swiper-pagination',
      },
    });

    return () => {
      // Cleanup Swiper when the component unmounts
      swiper.destroy();
    };
  }, []); // Empty dependency array to ensure it runs once

  return (
    <section className="gallery" id="gallery">
      <div className="swiper gallery-slider">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <img src="/assets/images/gallery-img-1.jpg" alt="" />
          </div>
          <div className="swiper-slide">
            <img src="/assets/images/gallery-img-2.webp" alt="" />
          </div>
          <div className="swiper-slide">
            <img src="/assets/images/gallery-img-3.webp" alt="" />
          </div>
          <div className="swiper-slide">
            <img src="/assets/images/gallery-img-4.webp" alt="" />
          </div>
          <div className="swiper-slide">
            <img src="/assets/images/gallery-img-5.webp" alt="" />
          </div>
          <div className="swiper-slide">
            <img src="/assets/images/gallery-img-6.webp" alt="" />
          </div>
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </section>
  );
}

export default SwiperGallery;