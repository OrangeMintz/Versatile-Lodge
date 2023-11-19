import React, { useContext, useEffect } from 'react';

// import styles from './dashboard.module.css';
import './dashboard.css';

import HeaderAdmin from '../../components/HeaderAdmin';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../components/userContext';

const Dashboard = () => {

    //GET PROFILE START
    const { user, setUser } = useContext(UserContext);
    useEffect(() => {
        if (!user) {
            axios.get('/profile')
                .then(({ data }) => {
                    setUser(data);
                })
                .catch((error) => {
                    console.error('Error fetching user profile:', error);
                });
        }
    }, [user, setUser]);


    //GET PROFILE END


    return (
        // <div className={styles.dashboard}>
        <div>
            <HeaderAdmin />
            <Sidebar />

            {/* <!-- overview section starts --> */}

            <section className="overview">

                <h1 className="heading">Overview</h1>

                <div className="box-container">

                    <div className="box">
                        <span>Occupancy</span>
                        <h3 className="title">Malaybalay:</h3>
                        <p>50%</p>
                    </div>

                    <div className="box">
                        <span>Occupancy</span>
                        <h3 className="title">Maramag:</h3>
                        <p>50%</p>
                    </div>

                    <div className="box">
                        <span>Occupancy</span>
                        <h3 className="title">Valencia:</h3>
                        <p>50%</p>
                    </div>

                    <div className="box">
                        <span>Occupancy</span>
                        <h3 className="title">Total:</h3>
                        <p>50%</p>
                    </div>

                    <div className="box">
                        <h3 className="title">Occupancy Statistics:</h3>
                        <div className="monthly"><i className='fas fa-calendar'></i> Monthly</div>
                        <div className="percents">
                            <div className="percent">100%</div>
                            <div className="percent">75%</div>
                            <div className="percent">50%</div>
                            <div className="percent">25%</div>
                            <div className="percent">0%</div>
                        </div>
                        <div className="rectangles">
                            <div className="rectangle1"></div>
                            <div className="rectangle2"></div>
                            <div className="rectangle3"></div>
                            <div className="rectangle4"></div>
                            <div className="rectangle5"></div>
                            <div className="rectangle6"></div>
                            <div className="rectangle7"></div>
                            <div className="rectangle8"></div>
                            <div className="rectangle9"></div>
                            <div className="rectangle10"></div>
                        </div>
                        <div className="months">
                            <div className="month">Nov</div>
                            <div className="month">Dec</div>
                            <div className="month">Jan</div>
                            <div className="month">Feb</div>
                            <div className="month">Mar</div>
                            <div className="month">Apr</div>
                            <div className="month">May</div>
                            <div className="month">Jun</div>
                            <div className="month">Jul</div>
                            <div className="month">Aug</div>
                        </div>

                    </div>

                    <div className="box">
                       <h3 className="title">rooms and comments:</h3>
                         {/* <p className="stat">total likes : <span>14</span></p>
                        <a href="/reviewsAdmin" className="inline-btn">view stars</a> */}
                        <p className="stat">available rooms : <span>2</span></p>
                        <a href="/roomsAvailable" className="inline-btn">view rooms</a>
                        <p className="stat">total comments : <span>5</span></p>
                        <a href="/reviewsAdmin" className="inline-btn">view comments</a>
                    </div>
                </div>

            </section>

            {/* <!-- overview section ends --> */}

            <Footer />

        </div>
    )
}

export default Dashboard;