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
        axios.get('/logout/admin')
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

    const [dadJoke, setDadJoke] = useState('');

    const apiUrl = '/dad-joke';

    const fetchDadJoke = async () => {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            setDadJoke(data.joke);
        } catch (error) {
            console.error('Error fetching Dad Joke:', error);
        }
    };

    // Call fetchDadJoke to get a joke when the component mounts
    useEffect(() => {
        fetchDadJoke();
    }, []);

    return (
        <>
            {user && (
                <div className='profileAdmin'>
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
                                <div className="centerDetails">
                                    <p style={{ textTransform: "none" }} className='info'><span>Username:</span> {userDetails.username}</p>
                                    <p style={{ textTransform: "none" }} className='info'><span>Email:</span> {userDetails.email}</p>
                                    <p className='info'><span>Birthday:</span> {userDetails.birthday}</p>
                                    <p className='info'><span>Address:</span> {userDetails.address}</p>
                                    <p className='info'><span>Phone Number:</span> {userDetails.phoneNumber}</p>
                                </div>
                                <div className="profileBtns">
                                    <Link to="/AccountSettings" className="profileBtn">Account Settings</Link>
                                    <Link onClick={handleLogout} className="profileBtn">Log out</Link>
                                </div>
                                <div className='joke-container'>
                                    <p className="title">Random Joke Generator</p>
                                    <p className="joke-text">{dadJoke}</p>
                                    <button className="joke-btn" onClick={fetchDadJoke}>
                                        Generate New Joke
                                    </button>
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
