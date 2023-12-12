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

      <FAQ />

      <Footer />
    </div>
  );
};

export default Home;
