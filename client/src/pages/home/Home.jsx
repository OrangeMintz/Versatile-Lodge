import React, { Fragment } from 'react'

export const Home = () => {
  return (
    <Fragment>
    <section className="header">
        <div className="flex">
            <a href="#home" className="logo">Hotels and Resorts</a>
            <a href="#availability" className="btn">check availability</a>
            <div className="menu fas fa-bars" id="menu-btn"></div>
        </div>

        <nav className="navbar">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#reservation">Reservation</a>
            <a href="#gallery">Gallery</a>
            <a href="#contact">Contact</a>
            <a href="#reviews">reviews</a>
        </nav>
    </section>



    <section class="footer">

        <div class="box-container">

            <div class="box">
                <a href="tel:1234567890"><i class="fas fa-phone"></i>+123-456-7890</a>
                <a href="tel:1111122333"><i class="fas fa-phone"></i>+111-226-3333</a>
                <a href="mailto:example@gmail.com"><i class="fas fa-envelope"></i>example@gmail.com</a>
                <a href="#"><i class="fas fa-map-marker-alt"></i>Malaybalay, Bukidnon - 8700</a>
            </div>
            <div class="box">
                <a href="#home">home</a>
                <a href="#about">about</a>
                <a href="#reservation">reservation</a>
                <a href="#gallery">gallery</a>
                <a href="#contact">contact</a>
                <a href="#reviews">reviews</a>
            </div>
            <div class="box">
                <a href="#">Facebook<i class='fab fa-facebook'></i></a>
                <a href="#">Twitter<i class="fab fa-twitter"></i></a>
                <a href="#">Instagram<i class="fab fa-instagram"></i></a>
                <a href="#">LinkedIn<i class="fab fa-linkedin"></i></a>
                <a href="#">Youtube<i class="fab fa-youtube"></i></a>
            </div>
        </div>

        <div class="credit">&copy; copyright @ 2023 by mr. web designer | all rights reserved!</div>

    </section>

      

    </Fragment>
    
  )
}

export default Home;
