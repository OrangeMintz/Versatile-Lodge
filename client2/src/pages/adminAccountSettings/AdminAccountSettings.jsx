import React from 'react';
import './adminAccountSettings.css';
import HeaderAdmin from '../../components/HeaderAdmin';
import Sidebar from '../../components/Sidebar';

const AdminAccountSettings = () => {
    return (
        <div className="adminAccountSettingsPage">

            <HeaderAdmin/>  
            <Sidebar/>

            <section className="adminAccountSettings">
                <h1 className='heading'>Account</h1>
                <div className="accountSettings">
                    <form action="">
                        <div className="labels">
                            <label htmlFor="">Profile Picture</label>
                            <label htmlFor="">First Name</label>
                            <label htmlFor="">Last Name</label>
                            <label htmlFor="">Email</label>
                            <label htmlFor="">Username</label>
                            <label htmlFor="">Password</label>
                        </div>
                        <div className="inputs">
                            <input type="file" accept="image/*" id="imageInput" onchange="previewImage()"/>
                            <input type="text" name="" id="" />
                            <input type="text" name="" id="" />
                            <input type="email" name="" id="" />
                            <input type="text" name="" id="" />
                            <input type="password" name="" id="" />
                        </div>
                    </form>
                </div>
            </section>
        </div>

    )
}

export default AdminAccountSettings;