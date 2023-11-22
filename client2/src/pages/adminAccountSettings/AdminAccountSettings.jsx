import React, {useState} from 'react';
import './adminAccountSettings.css';
import HeaderAdmin from '../../components/HeaderAdmin';
import Sidebar from '../../components/Sidebar';
import AdminChangePassModal from '../../components/AdminChangePassModal';

const AdminAccountSettings = () => {

    const [openPasswordModal, setOpenPasswordModal] = useState(false);

    return (
        <div className="adminAccountSettingsPage">

            <HeaderAdmin/>  
            <Sidebar/>

            <section className="adminAccountSettings">
                <h1 className='heading'>Account</h1>
                <div className="accountSettings">
                    <form action="#">
                        <div className="labels">
                            <label htmlFor="">Profile Picture:</label>
                            <label htmlFor="">Name:</label>
                            <label htmlFor="">Address:</label>
                            <label htmlFor="">Email:</label>
                            <label htmlFor="">Birthday:</label>
                            <label htmlFor="">Age:</label>
                            <label htmlFor="">Phone Number:</label>
                            <label htmlFor="">Username:</label>
                            <label  htmlFor="">Password:</label>
                        </div>
                        <div className="inputs">
                            <div className='profile-picture'>
                            <   input type="file" accept="image/*" id="imageInput" onchange="previewImage()"/>
                                <img src="https://th.bing.com/th/id/R.8e2c571ff125b3531705198a15d3103c?rik=gzhbzBpXBa%2bxMA&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-big-image-png-2240.png&ehk=VeWsrun%2fvDy5QDv2Z6Xm8XnIMXyeaz2fhR3AgxlvxAc%3d&risl=&pid=ImgRaw&r=0" alt="" />
                            </div>
                            <input type="text" name="" id="" />
                            <input type="text" name="" id="" />
                            <input type="email" name="" id="" />
                            <input type="text" name="" id="" />
                            <input type="number" name="" id="" />
                            <input type="number" name="" id="" />
                            <input type="text" name="" id="" />
                            <div className="adminBtns">
                                <button className="adminChangePassword" onClick={() => setOpenPasswordModal(true)}>Change Password</button>
                                <input type="submit" value="Update Profile" />
                            </div>

                            <AdminChangePassModal open={openPasswordModal} onClose={() => setOpenPasswordModal(false)} />
                        </div>
                    </form>
                </div>
            </section>
        </div>

    )
}

export default AdminAccountSettings;