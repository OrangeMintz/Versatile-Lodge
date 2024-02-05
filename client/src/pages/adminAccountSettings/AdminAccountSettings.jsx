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
        image: '',
    });
    const [operationsComplete, setOperationsComplete] = useState(false);
    const [openPasswordModal, setOpenPasswordModal] = useState(false);
    const navigate = useNavigate();
    const [formSubmitted, setFormSubmitted] = useState(false);

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
                    setOperationsComplete(true);
                });
        }
    }, [user, setUser]);

    useEffect(() => {
        if (operationsComplete && !user) {
            navigate('/');
        }
    }, [user, operationsComplete, navigate]);

    const fetchUser = async () => {
        try {
            const response = await axios.get(`/admin/user/${user.id}`);
            setUserDetails(response.data);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchUser();
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        let error = '';

        switch (id) {
            case 'name':
                // Validation for name: only allow letters, space, and dot
                const nameRegex = /^[a-zA-Z. ]+$/;
                if (!nameRegex.test(value)) {
                    error = 'Name should only contain letters, space, and dot.';
                }
                break;

            case 'address':
                // Validation for address: should be 8 characters or more
                if (value.length < 8) {
                    error = 'Address should be 8 characters or more.';
                }
                break;

            case 'email':
                // Validation for email: should contain '@'
                const emailRegex = /\S+@\S+\.\S+/;
                if (!emailRegex.test(value)) {
                    error = 'Invalid email address.';
                }
                break;

            case 'phoneNumber':
                // Validation for phone number: should start with '09' and be 11 digits long
                const phoneNumberRegex = /^09[0-9]{9}$/;
                if (!phoneNumberRegex.test(value)) {
                    error = 'Invalid phone number.';
                }
                break;

            default:
                break;
        }

        if (error && formSubmitted) {
            toast.error(error);
        } else {
            setUserDetails((prevUserDetails) => ({
                ...prevUserDetails,
                [id]: value,
            }));
        }
    };

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

    const updateProfile = async () => {
        setFormSubmitted(true);

        // Validate the inputs before submitting the form
        const validationErrors = validateInputs();
        if (validationErrors.length > 0) {
            // Display toast messages for validation errors
            validationErrors.forEach(error => toast.error(error));
            setFormSubmitted(false);
            return;
        }

        try {
            const updatedDetailsWithoutImage = { ...userDetails };
            if (updatedDetailsWithoutImage.image === '') {
                delete updatedDetailsWithoutImage.image;
            }

            const response = await axios.put(`/admin/profile/${user.id}`, updatedDetailsWithoutImage);
            console.log(response.data);
            window.location.href = `${window.location.origin}/AccountSettings`;
        } catch (error) {
            console.error('Error updating user profile:', error);
            toast.error('Error updating user profile. Please try again.');
        } finally {
            setFormSubmitted(false);
        }
    };

    const validateInputs = () => {
        const validationErrors = [];

        // Validation for name: only allow letters, space, and dot
        const nameRegex = /^[a-zA-Z. ]+$/;
        if (!nameRegex.test(userDetails.name)) {
            validationErrors.push('Name should only contain letters, space, and dot.');
        }

        // Validation for address: should be 8 characters or more
        if (userDetails.address.length < 8) {
            validationErrors.push('Address should be 8 characters or more.');
        }

        // Validation for email: should contain '@'
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(userDetails.email)) {
            validationErrors.push('Invalid email address.');
        }

        // Validation for phone number: should start with '09' and be 11 digits long
        const phoneNumberRegex = /^09[0-9]{9}$/;
        if (!phoneNumberRegex.test(userDetails.phoneNumber)) {
            validationErrors.push('Invalid phone number.');
        }

        return validationErrors;
    };

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
                                    <input type="submit" value="Update Profile" />
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </section>
        </div>
    );
};

export default AdminAccountSettings;
