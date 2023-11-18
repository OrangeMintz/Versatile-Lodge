import React from 'react';
import './profileAdmin.css';
import HeaderAdmin from '../../components/HeaderAdmin';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';


const ProfileAdmin = () => {
    return (
        <div>

            <HeaderAdmin/>
            <Sidebar/>
            
                <section className="heading">
                    <h1 className="heading">Admin Profile Details</h1>
                    <div className="profileAdminGrid">

                        {/* <div className="profileAdminCalendar">
                            <img src="https://www.clker.com/cliparts/t/J/l/4/A/7/calendar-larger-hi.png" alt="" />
                        </div> */}

                        <div className="profileAdminDetails">
                            <img src="https://th.bing.com/th/id/OIP.edPmh_52ubwjIDT2YIBjkAAAAA?pid=ImgDet&rs=1" alt="" />
                            <h3>Anzai Mitsuyoshi</h3>
                            <span>admin</span>
                            <div className="profileBtns">
                                <a href="#" className="profileBtn">Account Settings</a>
                                <a href="#" className="profileBtn">Change Password</a>
                                <a href="/loginAdmin" className="profileBtn">Log out</a>
                            </div>
                        </div>



                    </div>
                </section>

            <Footer/>

        </div>
    )
}

export default ProfileAdmin;