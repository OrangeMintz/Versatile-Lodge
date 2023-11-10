import React from 'react';

// import styles from './dashboard.module.css';
import './dashboard.css';

import HeaderAdmin from '../../component/HeaderAdmin';
import Sidebar from '../../component/Sidebar';

const Dashboard = () => {

    return (
        // <div className={styles.dashboard}>
        <div className='body'>
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

        
        
        
        
        
        
        
        
        
            <footer className="footer">
            
                &copy; copyright @ 2023 by <span>"the group name"</span> || all rights reserved!
            
            </footer>
        
        </div>
    )
}

export default Dashboard;