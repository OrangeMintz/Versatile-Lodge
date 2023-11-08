import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from "../context/userContext.jsx"
import axios from 'axios'


function Navbar() {

    const { user, setUser } = useContext(UserContext)

    useEffect(() => {
        if (!user) {
            axios.get('/profile')
                .then(({ data }) => {
                    setUser(data);
                })
                .catch((error) => {
                    console.error('Error fetching user profile:', error);
                });
        }
    }, [user, setUser]);

    const handleLogout = () => {
        axios.get('/logout')
            .then(() => {
                navigate('/login');
            })
            .catch((error) => {
                console.error('Error during logout:', error);
            });
    };



    const [navbarActive, setNavbarActive] = useState(false);
    const toggleNavbar = () => {
        setNavbarActive(!navbarActive);
    };

    const handleUserBtnClick = () => {                      // for toggling profile
        const profile = document.querySelector('.profile');
        profile.classList.toggle('active');
    }

    return (
        <div>
            <section className="header">
                <div className="flex">
                    <Link to="/" className="logo">Versatile Lodge</Link>
                    <div
                        className={`menu fas fa-bars ${navbarActive ? 'active' : ''}`}
                        id="menu-btn"
                        onClick={toggleNavbar}
                    ></div>
                </div>

                <nav className={`navbar ${navbarActive ? 'active' : ''}`}>
                    <Link to="#" className='active'>Home</Link>
                    <Link to="/about" >About</Link>
                    <Link to="/rooms" >Rooms</Link>
                    <Link to="/contact" >Contact</Link>
                    <Link to="/reviews" >Reviews</Link>
                    <Link to="/protected" >Protected</Link>

                    <img
                        src="assets/images/user4.jpg"
                        id="user-btn"
                        alt="user"
                        onClick={handleUserBtnClick}
                    />
                    <div className="profile">
                        <img src="assets/images/user4.jpg" alt="" />
                        {!!user && (<h3>{user.name}</h3>)}
                        <span>Client</span>
                        <Link to="/accountSetting" className='btn'>View Profile</Link>
                        <div className="flex-btn">
                            <a href="bookingHistory" className="option-btn">
                                History
                            </a>
                            <a href="login" className="option-btn" onClick={handleLogout}>
                                Logout
                            </a>
                        </div>
                    </div>
                </nav>
            </section>
        </div>
    )
}

export default Navbar