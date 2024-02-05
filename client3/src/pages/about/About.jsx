import { useState } from "react";
import { useEffect } from "react";
import './about.css';

import axios from "axios";
import Footer from "../../component/footer";
import Navbar from "../../component/Navbar";

const About = () => {
    const [navbarActive, setNavbarActive] = useState(false);

    const toggleNavbar = () => {
        setNavbarActive(!navbarActive);
    };

    const handleUserBtnClick = () => {                      // for toggling profile
        const profile = document.querySelector('.profile');
        profile.classList.toggle('active');
    }

    return (

        <div className="About">
            <Navbar />
            {/* <!-- about-us section --> */}
            <section className="about-us">

                <h1>--- About Us ---</h1>

                <h2>Welcome to Versatile</h2>

                <p style={{ textAlign: 'justify', textIndent: '3em' }}>
                    Welcome to Versatile Lodge! We strive to provide you with an exceptional experience during your stay. Our cozy rooms, friendly staff, and top-notch amenities are here to make your time with us memorable. Whether you're here for business or leisure, we aim to make your stay comfortable and enjoyable. Explore our reviews and feel free to share your thoughts with us. We look forward to hosting you at Versatile Lodge!
                </p>
                <br></br>
                <p style={{ textAlign: 'justify', textIndent: '3em' }}>
                    At Versatile Lodge, we pride ourselves on creating an inviting atmosphere for our guests. Immerse yourself in the serene surroundings, unwind in our cozy accommodations, and experience the warmth of our hospitality. As you explore the diverse offerings of our lodge, we invite you to share your thoughts and experiences through our reviews. Your feedback is invaluable in helping us continually enhance our services. Thank you for choosing Versatile Lodge — where comfort meets hospitality.
                </p>
            </section>


            {/* <!-- service section --> */}

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




            <Footer />

        </div >
    );
}

export default About;
