import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import Footer from '../../component/footer';
import SwiperCarousel from '../../component/SwiperCarousel'
import SwiperGallery from '../../component/SwiperGallery';
import { useContext } from 'react';
import AuthContext from '../../context/AuthProvider';
import Navbar from '../../component/Navbar';
import FAQ from '../../component/FAQ';

const Home = () => {

  const { setAuth } = useContext(AuthContext)
  const navigate = useNavigate()


  return (
    <div>
      <Navbar />
      <SwiperCarousel />
      <section className="services">

        <div className="box-container">

          <div className="box">
            <img src="/assets/images/icon-1.png" alt="" />
            <h3>Easy to Access</h3>
            <p>Whether you're arriving by car, public transportation, or other means, our strategic location makes it convenient for you to reach us.</p>
          </div>

          <div className="box">
            <img src="/assets/images/icon-2.png" alt="" />
            <h3>Nature Views</h3>
            <p>Our lodge is designed to offer a connection with the natural environment, creating a peaceful and rejuvenating experience.</p>
          </div>

          <div className="box">
            <img src="/assets/images/icon-3.png" alt="" />
            <h3>Eco Friendly</h3>
            <p>Versatile Lodge takes pride in implementing eco-friendly practices to minimize our ecological footprint.</p>
          </div>

          <div className="box">
            <img src="/assets/images/icon-4.png" alt="" />
            <h3>Safety and Security</h3>
            <p>Rest easy knowing that we have implemented comprehensive safety protocols to make your stay worry-free.</p>
          </div>

          <div className="box">
            <img src="/assets/images/icon-5.png" alt="" />
            <h3>Peaceful Environment</h3>
            <p>Whether you're here for a quiet getaway or focused work, our surroundings create an ideal setting for a tranquil experience.</p>
          </div>

          <div className="box">
            <img src="/assets/images/icon-6.png" alt="" />
            <h3>Cozy Rooms</h3>
            <p> Each room at Versatile Lodge is a haven where you can unwind and recharge, ensuring a restful and pleasant stay.</p>
          </div>
        </div>
      </section>

      <SwiperGallery />

      <FAQ />

      <Footer />
    </div>
  );
};

export default Home;
