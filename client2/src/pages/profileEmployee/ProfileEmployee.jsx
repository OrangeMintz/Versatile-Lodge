import React from 'react';
import './profileEmployee.css';
import HeaderAdmin from '../../components/HeaderAdmin';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';


const ProfileEmployee = () => {
    return (
        <div>

            <HeaderAdmin/>
            <Sidebar/>
            
                <section className="heading">
                    <h1 className="heading">Employee Profile Details</h1>
                    <div className="profileEmployee">
                        <img src="./assets/images/chizuru.jpg" alt="" />
                        <h3>Chizuru Mizuhara</h3>
                        <span>employee</span>
                        <div className="profileBtns">
                            <a href="#" className="profileBtn">Account Settings</a>
                            <a href="#" className="profileBtn">Change Password</a>
                            <a href="/loginAdmin" className="profileBtn">Log out</a>
                        </div>
                    </div>
                </section>

            <Footer/>

        </div>
    )
}

export default ProfileEmployee;