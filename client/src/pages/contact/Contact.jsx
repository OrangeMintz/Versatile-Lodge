import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import "./contact.css";
import axios from "axios";
import Footer from "../../component/footer";
import Navbar from "../../component/Navbar";

const Contact = () => {

    return (
        <div>
            <Navbar />

            {/* <!-- contact-heading section --> */}
            <section className="contact-heading">

                <h1>--- Contact Us ---</h1>

                <img src="assets/images/map.png" alt="" />



            </section>

            {/* <!-- contact section --> */}
            <section className="contact" id="contact">

                <div className="row">

                    <form action="" method="post">
                        <h3>send us message</h3>
                        <input type="text" name="name" required maxLength="50" placeholder="enter your name" className="box" />
                        <input type="email" name="email" required maxLength="50" placeholder="enter your email" className="box" />
                        <input type="number" name="number" required maxLength="10" min="0" max="99999999" placeholder="enter your number" className="box" />
                        <textarea name="msg" className="box" required maxLength="1000" placeholder="enter your message" cols="30" rows="10"></textarea>
                        <input type="submit" value="send message" name="send" className="btn" />
                    </form>

                    <div className="faq">
                        <h3 className="title">frequently asked questions</h3>
                        <div className="box">
                            <h3>how to cancel?</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut voluptate vitae temporibus quis necessitatibus quos provident atque sapiente aperiam illum iusto fugiat  tenetur in cupiditate magni?</p>
                        </div>
                        <div className="box">
                            <h3>is there any vacancy?</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut voluptate vitae temporibus quis necessitatibus quos provident atque sapiente aperiam illum iusto fugiat  tenetur in cupiditate magni?</p>
                        </div>
                        <div className="box">
                            <h3>what are payment methods?</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut voluptate vitae temporibus quis necessitatibus quos provident atque sapiente aperiam illum iusto fugiat  tenetur in cupiditate magni?</p>
                        </div>
                        <div className="box">
                            <h3>how to claim coupons codes?</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut voluptate vitae temporibus quis necessitatibus quos provident atque sapiente aperiam illum iusto fugiat  tenetur in cupiditate magni?</p>
                        </div>
                        <div className="box">
                            <h3>what are the age requirements?</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut voluptate vitae temporibus quis necessitatibus quos provident atque sapiente aperiam illum iusto fugiat  tenetur in cupiditate magni?</p>
                        </div>
                        <div className="swiper-pagination"></div>
                    </div>

                </div>

            </section>

            <Footer />
        </div>


    );
}

export default Contact;
