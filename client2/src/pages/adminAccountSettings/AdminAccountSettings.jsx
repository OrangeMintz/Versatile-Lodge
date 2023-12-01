// AdminAccountSettings.jsx

import React, { useContext, useEffect, useState } from 'react';
import './adminAccountSettings.css';
import HeaderAdmin from '../../components/HeaderAdmin';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import AdminChangePassModal from '../../components/AdminChangePassModal';
import { UserContext } from '../../components/userContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';


const AdminAccountSettings = () => {
    const { user, setUser } = useContext(UserContext);
    const [userDetails, setUserDetails] = useState({
        email: '',
        birthday: '',
        address: '',
        phoneNumber: '',
        username: '',
        image: '',  // Assuming the user has an 'image' property
    });
    const [operationsComplete, setOperationsComplete] = useState(false);
    const [openPasswordModal, setOpenPasswordModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            axios
                .get('/profile/admin')
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

    // Call fetchUser when the user is available
    useEffect(() => {
        if (user) {
            fetchUser();
        }
    }, [user]);



    // IMAGE
    // Update user details in the local state
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUserDetails((prevUserDetails) => ({
            ...prevUserDetails,
            [id]: value,
        }));
    };

    // Handle file input for the profile picture
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setUserDetails((prevUserDetails) => ({
                ...prevUserDetails,
                image: reader.result,
            }));
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    // UPDATE
    // Update user details on the server
    const updateProfile = async () => {
        try {
            // Remove 'image' property if it is empty
            const updatedDetailsWithoutImage = { ...userDetails };
            if (updatedDetailsWithoutImage.image === '') {
                delete updatedDetailsWithoutImage.image;
            }

            const response = await axios.put(`/admin/profile/${user.id}`, updatedDetailsWithoutImage);
            console.log(response.data);
            window.location.href = `${window.location.origin}/AccountSettings`;
        } catch (error) {
            console.error('Error updating user profile:', error);
            // Handle error, set an error state, or show a notification
        }
    };



    // const updateProfile = async () => {
    //     try {
    //         // Remove 'image' property if it is empty
    //         if (userDetails.image === '') {
    //             const { image, ...updatedDetailsWithoutImage } = userDetails;
    //             setUserDetails(updatedDetailsWithoutImage);
    //         }
    //         const response = await axios.put(`/admin/profile/${user.id}`, userDetails);
    //         console.log(response.data);
    //         window.location.href = `${window.location.origin}/AccountSettings`;
    //     } catch (error) {
    //         console.error('Error updating user profile:', error);
    //         // Handle error, set an error state, or show a notification
    //     }
    // };

    return (
        <div className="adminAccountSettingsPage">
            <HeaderAdmin />
            <Sidebar />

            <section className="adminAccountSettings">
                <h1 className='heading'>Account</h1>
                <div className="accountSettings">
                    {user && (
                        <form onSubmit={(e) => { e.preventDefault(); updateProfile(); }}>
                            <div className="labels">
                                <label htmlFor="">Profile Picture:</label>
                                <label htmlFor="">Name:</label>
                                <label htmlFor="">Address:</label>
                                <label htmlFor="">Email:</label>
                                <label htmlFor="">Birthday:</label>
                                <label htmlFor="">Phone Number:</label>
                                <label htmlFor="">Username:</label>
                                <label htmlFor=""></label>
                            </div>
                            <div className="inputs">
                                <div className='profile-picture'>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="imageInput"
                                        onChange={handleFileChange}
                                    />
                                    <img src={userDetails.image} alt="" />
                                </div>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder={userDetails.name}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    id="address"
                                    placeholder={userDetails.address}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="email"
                                    id="email"
                                    placeholder={userDetails.email}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="date"
                                    id="birthday"
                                    placeholder={userDetails.birthday}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="number"
                                    id="phoneNumber"
                                    placeholder={userDetails.phoneNumber}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    id="username"
                                    placeholder={userDetails.username}
                                    onChange={handleInputChange}
                                />
                                <div className="adminBtns">
                                    {/* <button type="button" className="adminChangePassword" onClick={() => setOpenPasswordModal(true)}
                                    >Change Password
                                    </button> */}
                                    <input type="submit" value="Update Profile" />
                                </div>
                                {/* <AdminChangePassModal
                                    open={openPasswordModal}
                                    onClose={() => setOpenPasswordModal(false)}
                                /> */}
                            </div>
                        </form>
                    )}
                </div>

            </section>
            {/* <Footer /> */}

        </div>
    );
};

export default AdminAccountSettings;
