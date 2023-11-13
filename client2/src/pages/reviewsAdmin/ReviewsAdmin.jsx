import React from 'react';
import './reviewsAdmin.css';
import HeaderAdmin from '../../components/HeaderAdmin';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';


const ReviewsAdmin = () => {
    return (
        <div>
            <HeaderAdmin />
            <Sidebar />

            <section className="reviews">

                <h1 className="heading">Customer's Reviews</h1>
                    
                <div className="box-container">
                        
                    <div className="box">
                        <div className="customer">
                            <img src="./assets/images/chizuru.jpg" alt=""/>
                            <div>
                                <h3>Lizl Conception</h3>
                                <span>09-16-2023</span>
                            </div>
                        </div>
                        <span className='stars'>⭐⭐⭐⭐⭐</span>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti perspiciatis velit nobis dignissimos architecto id recusandae a vitae harum enim ut repudiandae, explicabo esse aspernatur quidem quaerat similique. Nisi, soluta.</p>
                    </div>

                    <div className="box">
                        <div className="customer">
                            <img src="./assets/images/chizuru.jpg" alt=""/>
                            <div>
                                <h3>Raygie Gante</h3>
                                <span>09-16-2023</span>
                            </div>
                        </div>
                        <span className='stars'>⭐⭐⭐⭐⭐</span>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti perspiciatis velit nobis dignissimos architecto id recusandae a vitae harum enim ut repudiandae, explicabo esse aspernatur quidem quaerat similique. Nisi, soluta.</p>
                    </div>

                    <div className="box">
                        <div className="customer">
                            <img src="./assets/images/chizuru.jpg" alt=""/>
                            <div>
                                <h3>Djukeije Gacus</h3>
                                <span>09-16-2023</span>
                            </div>
                        </div>
                        <span className="stars">⭐⭐⭐⭐⭐</span>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti perspiciatis velit nobis dignissimos architecto id recusandae a vitae harum enim ut repudiandae, explicabo esse aspernatur quidem quaerat similique. Nisi, soluta.</p>
                    </div>

                    <div className="box">
                        <div className="customer">
                            <img src="./assets/images/chizuru.jpg" alt=""/>
                            <div>
                                <h3>Ramonito Caumban</h3>
                                <span>09-16-2023</span>
                            </div>
                        </div>
                        <span className="stars">⭐⭐⭐⭐⭐</span>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti perspiciatis velit nobis dignissimos architecto id recusandae a vitae harum enim ut repudiandae, explicabo esse aspernatur quidem quaerat similique. Nisi, soluta.</p>
                    </div>

                    <div className="box">
                        <div className="customer">
                            <img src="./assets/images/chizuru.jpg" alt=""/>
                            <div>
                                <h3>John Doe</h3>
                                <span>09-16-2023</span>
                            </div>
                        </div>
                        <span className="stars">⭐⭐⭐⭐⭐</span>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti perspiciatis velit nobis dignissimos architecto id recusandae a vitae harum enim ut repudiandae, explicabo esse aspernatur quidem quaerat similique. Nisi, soluta.</p>
                    </div>

                    <div className="box">
                        <div className="customer">
                            <img src="./assets/images/chizuru.jpg" alt=""/>
                            <div>
                                <h3>Brigitte Deehay</h3>
                                <span>09-16-2023</span>
                            </div>
                        </div>
                        <span className="stars">⭐⭐⭐⭐⭐</span>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti perspiciatis velit nobis dignissimos architecto id recusandae a vitae harum enim ut repudiandae, explicabo esse aspernatur quidem quaerat similique. Nisi, soluta.</p>
                    </div>

                </div>

                <div className="more-btn">
                    <a href="#" className="inline-option-btn">view more</a>
                </div>
                
            </section>

            <Footer />
        </div>
    )
}

export default ReviewsAdmin;