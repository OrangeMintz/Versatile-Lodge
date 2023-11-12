import React, { useState } from 'react';
import "./reviews.css";
import Footer from '../../component/footer';
import Navbar from '../../component/Navbar';

const Reviews = () => {
    return (
        <div>
            <Navbar />

            {/* <!-- reviews-heading section --> */}
            <section className="reviews-heading">

                <h1>--- Reviews ---</h1>

            </section>


            {/* <!-- scrollable reviews --> */}


            <div className="reviews-container">
                <div className="review">
                    <div className="review-left">
                        <img src="/assets/images/pic-1.png" alt="" />
                        <h3>John Doe</h3>
                    </div>
                    <div className="review-right">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit?</p>
                        <p>Date: October 10, 2023</p>
                    </div>
                </div>
                <div className="review">
                    <div className="review-left">
                        <img src="/assets/images/pic-2.png" alt="" />
                        <h3>John Doe</h3>
                    </div>
                    <div className="review-right">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit?</p>
                        <p>Date: October 10, 2023</p>
                    </div>
                </div>
                <div className="review">
                    <div className="review-left">
                        <img src="/assets/images/pic-3.png" alt="" />
                        <h3>John Doe</h3>
                    </div>
                    <div className="review-right">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit?</p>
                        <p>Date: October 10, 2023</p>
                    </div>
                </div>
                <div className="review">
                    <div className="review-left">
                        <img src="/assets/images/pic-4.png" alt="" />
                        <h3>John Doe</h3>
                    </div>
                    <div className="review-right">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit? dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit? dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit?</p>
                        <p>Date: October 10, 2023</p>
                    </div>
                </div>
                <div className="review">
                    <div className="review-left">
                        <img src="/assets/images/pic-5.png" alt="" />
                        <h3>John Doe</h3>
                    </div>
                    <div className="review-right">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit?</p>
                        <p>Date: October 10, 2023</p>
                    </div>
                </div>
                <div className="review">
                    <div className="review-left">
                        <img src="/assets/images/pic-6.png" alt="" />
                        <h3>John Doe</h3>
                    </div>
                    <div className="review-right">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit?</p>
                        <p>Date: October 10, 2023</p>
                    </div>
                </div>
                <div className="review">
                    <div className="review-left">
                        <img src="/assets/images/pic-2.png" alt="" />
                        <h3>John Doe</h3>
                    </div>
                    <div className="review-right">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit?</p>
                        <p>Date: October 10, 2023</p>
                    </div>
                </div>
                <div className="review">
                    <div className="review-left">
                        <img src="/assets/images/pic-1.png" alt="" />
                        <h3>John Doe</h3>
                    </div>
                    <div className="review-right">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit? laborum ex praesentium fugit?</p>
                        <p>Date: October 10, 2023</p>
                    </div>
                </div>
                <div className="review">
                    <div className="review-left">
                        <img src="/assets/images/pic-8.jpg" alt="" />
                        <h3>John Doe</h3>
                    </div>
                    <div className="review-right">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit?</p>
                        <p>Date: October 10, 2023</p>
                    </div>
                </div>
                <div className="review">
                    <div className="review-left">
                        <img src="/assets/images/pic-3.png" alt="" />
                        <h3>John Doe</h3>
                    </div>
                    <div className="review-right">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id eum dolor, aspernatur amet alias optio debitis magnam similique laborum ex praesentium fugit? the qerasf</p>
                        <p>Date: October 10, 2023</p>
                    </div>
                </div>
                {/* <!-- Repeat this structure for additional reviews --> */}
            </div>

            <Footer />


        </div>
    );
};

export default Reviews;
