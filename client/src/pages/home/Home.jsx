import React, { Fragment, useState } from 'react';

export const Home = () => {
  const [navbarActive, setNavbarActive] = useState(false);

  const toggleNavbar = () => {
    setNavbarActive(!navbarActive);
  };

  return (
    <Fragment>
      <section className="header">
        <div className="flex">
          <a href="#home" className="logo">
            Hotels and Resorts
          </a>
          <a href="#availability" className="btn">
            Check Availability
          </a>
          <div className={`menu fas fa-bars ${navbarActive ? 'active' : ''}`} id="menu-btn" onClick={toggleNavbar}>
            {/* The menu button icon */}
          </div>
        </div>

        <nav className={`navbar ${navbarActive ? 'active' : ''}`}>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#reservation">Reservation</a>
          <a href="#gallery">Gallery</a>
          <a href="#contact">Contact</a>
          <a href="#reviews">Reviews</a>
        </nav>
      </section>
    </Fragment>
  );
};

export default Home;
