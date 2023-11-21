import React, { useContext, useEffect, useState } from 'react';
import './profile.css';
import HeaderAdmin from '../../components/HeaderAdmin';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from "../../components/userContext";
import axios from 'axios';

const ProfileAdmin = () => {
    const navigate = useNavigate();

    // Check LOGON
    const { user, setUser } = useContext(UserContext);
    const [operationsComplete, setOperationsComplete] = useState(false);
    const [userFetch, setuserFetch] = useState('');


    const [userDetails, setUserDetails] = useState({
        email: '',
        birthday: '',
        address: '',
        phonenumber: '',
    });

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
            setUserDetails(response.data);  // Assuming the user data has properties email, birthday, address, phonenumber
            setuserFetch(false);
        } catch (error) {
            console.error('Error fetching user:', error);
            // Handle error, set an error state, or show a notification
            setuserFetch(false);
        }
    };

    // Call fetchUser when user is available
    useEffect(() => {
        if (user) {
            fetchUser();
        }
    }, [user]);

    const handleLogout = () => {
        axios.get('/logout')
            .then(() => {
                // Set the new location
                window.location.href = `${window.location.origin}/`;
                // Reload the page
                // window.location.reload();
            })
            .catch((error) => {
                console.error('Error during logout:', error);
            });
    };

    return (
        <>
            {user && (
                <div>
                    <HeaderAdmin />
                    <Sidebar />
                    <section className="heading">
                        <h1 className="heading">
                            {user.isAdmin && 'Admin Profile Details'}
                            {user.isEmployee && 'Employee Profile Details'}
                            {user.isManager && 'Manager Profile Details'}
                        </h1>
                        <div className="profileAdminGrid">
                            <div className="profileAdminDetails">
                                <img src={user.image} alt="" />
                                <h3>{user.name}</h3>
                                <span className='span'>{user.isAdmin && 'Admin'} {user.isManager && 'Manager'} {user.isEmployee && 'Employee'}</span>
                                <br />
                                <br />
                                <p style={{ textTransform: "none" }} className='info'>Username: {userDetails.username}</p>
                                <p style={{ textTransform: "none" }} className='info'>Email: {userDetails.email}</p>
                                <p className='info'>Birthday: {userDetails.birthday}</p>
                                <p className='info'>Address: {userDetails.address}</p>
                                <p className='info'>Phone Number: {userDetails.phoneNumber}</p>
                                <div className="profileBtns">
                                    <Link to="#" className="profileBtn">Account Settings</Link>
                                    <Link to="#" className="profileBtn">Change Password</Link>
                                    <Link onClick={handleLogout} className="profileBtn">Log out</Link>
                                </div>
                            </div>
                        </div>
                    </section >
                    <Footer />
                </div >
            )}
        </>
    );
};

export default ProfileAdmin;
