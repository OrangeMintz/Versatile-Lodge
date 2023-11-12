import React from 'react';

// import styles from './dashboard.module.css';
import './dashboard.css';

import HeaderAdmin from '../../components/HeaderAdmin';
import Sidebar from '../../components/Sidebar';

const Dashboard = () => {

    return (
        // <div className={styles.dashboard}>
        <div>
            <HeaderAdmin />
            
            <Sidebar />

             {/* <!-- overview section starts --> */}
            
            <section className="overview">
            
                <h1 className="heading">overview</h1>
            
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
                        <h3 className="title">likes and comments:</h3>
                        <p className="stat">total likes : <span>14</span></p>
                        <a href="#" className="inline-btn">view likes</a>
                        <p className="stat">total comments : <span>5</span></p>
                        <a href="#" className="inline-btn">view comments</a>
                        <p className="stat">available rooms : <span>2</span></p>
                        <a href="#" className="inline-btn">view rooms</a>
                    </div>
                </div>
            
            </section>
            
            {/* <!-- overview section ends --> */}

        
        
        
        
        
        
        
        
        
            <footer className="footerAdmin">
            
                &copy; copyright @ 2023 by <span>"BSIT-3B"</span> || all rights reserved!
            
            </footer>
        
        </div>
    )
}

export default Dashboard;