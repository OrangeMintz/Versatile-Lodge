import React from 'react';
import { Link } from "react-router-dom";

const Sidebar = () => {


    //close button INSIDE Sidebar
    const handleCloseIconClick = () => {                        //close sidebar     
        const sideBar = document.querySelector('.side-bar');
        const body = document.body;                                //html's body element
        const menu_btn = document.querySelector('#menu-btn');     //selects outside menu-btn

        sideBar.classList.toggle('active');        //remove sidebar          
        body.classList.toggle('active');           //occupy the sidebar
        menu_btn.classList.add('active');          //activate sidebar icon 
    }

    return (
        <div className="side-bar">

            <div className="profile">
                <div className="icons">
                    <div id="close-btn" className="fas fa-times" onClick={handleCloseIconClick}></div>
                </div>
                <img src="https://th.bing.com/th/id/OIP.edPmh_52ubwjIDT2YIBjkAAAAA?pid=ImgDet&rs=1" alt="" />
                <h3>Anzai Mitsuyoshi</h3>
                <span>admin</span>
                <Link to="/profileAdmin" className="btn">view profile</Link>
            </div>

            <nav className="navbar">
                <Link to="../"><i className="fas fa-home"></i><span>Home</span></Link>
                <Link to="/reviewsAdmin"><i className="fas fa-star"></i><span>Reviews</span></Link>
                <Link to="/employees"><i className="fas fa-users"></i><span>Employees</span></Link>
                <Link to="/roomsAvailable"><i className="fas fa-bed"></i><span>Rooms</span></Link>
                <Link to="/roomsReserved"><i className="fas fa-code-branch"></i><span>Transactions</span></Link>
                <Link to="/payroll"><i className="fas fa-dollar-sign"></i><span>Payroll</span></Link>
                <Link to="/loginAdmin"><i className="fas fa-power-off"></i><span>Log out</span></Link>

            </nav>

        </div>
    )
}

export default Sidebar;