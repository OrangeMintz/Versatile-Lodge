import React, { useContext, useEffect, useState } from 'react';
import './adminAccountSettings.css';
import HeaderAdmin from '../../components/HeaderAdmin';
import Sidebar from '../../components/Sidebar';
import AdminChangePassModal from '../../components/AdminChangePassModal';
import { UserContext } from '../../components/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminAccountSettings = () => {
    const { user, setUser } = useContext(UserContext);
    const [userDetails, setUserDetails] = useState({
        email: '',
        birthday: '',
        address: '',
        phoneNumber: '',
        username: '',
        image: '',  // Assuming user has an 'image' property
    });
    const [operationsComplete, setOperationsComplete] = useState(false);
    const [openPasswordModal, setOpenPasswordModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            axios
                .get('/profile')
                .then(({ data }) => {
                    setUser(data);
                })
                .catch((error) => {
                    console.error('Error fetching user profile:', error);
                })
                .finally(() => {
                    // Set operationsComplete to true after data fetching is complete
                    setOperationsComplete(true);
                });
        }
    }, [user, setUser]);

    useEffect(() => {
        if (operationsComplete && !user) {
            navigate('/');
        }
    }, [user, operationsComplete, navigate]);

    // FETCHED USER
    const fetchUser = async () => {
        try {
            const response = await axios.get(`/admin/user/${user.id}`);
            setUserDetails(response.data);
        } catch (error) {
            console.error('Error fetching user:', error);
            // Handle error, set an error state, or show a notification
        }
    };

    // Call fetchUser when user is available
    useEffect(() => {
        if (user) {
            fetchUser();
        }
    }, [user]);

    return (
        <div className="adminAccountSettingsPage">
            <HeaderAdmin />
            <Sidebar />

            <section className="adminAccountSettings">
                <h1 className='heading'>Account</h1>
                <div className="accountSettings">
                    {user && (
                        <form action="#">
                            <div className="labels">
                                <label htmlFor="">Profile Picture:</label>
                                <label htmlFor="">Name:</label>
                                <label htmlFor="">Address:</label>
                                <label htmlFor="">Email:</label>
                                <label htmlFor="">Birthday:</label>
                                <label htmlFor="">Phone Number:</label>
                                <label htmlFor="">Username:</label>
                                <label htmlFor="">Password:</label>
                            </div>
                            <div className="inputs">
                                <div className='profile-picture'>
                                    <input type="file" accept="image/*" id="imageInput" />
                                    <img src={userDetails.image} alt="" />
                                </div>
                                <input type="text" id="" placeholder={userDetails.name} />
                                <input type="text" id="" placeholder={userDetails.address} />
                                <input type="email" id="" placeholder={userDetails.email} />
                                <input type="text" id="" placeholder={userDetails.birthday} />
                                <input type="number" id="" placeholder={userDetails.phoneNumber} />
                                <input type="text" id="" placeholder={userDetails.username} />
                                <div className="adminBtns">
                                    <button className="adminChangePassword" onClick={() => setOpenPasswordModal(true)}>Change Password</button>
                                    <input type="submit" value="Update Profile" />
                                </div>
                                <AdminChangePassModal open={openPasswordModal} onClose={() => setOpenPasswordModal(false)} />
                            </div>
                        </form>
                    )}
                </div>
            </section>
        </div>
    );
}

export default AdminAccountSettings;
