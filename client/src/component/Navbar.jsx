import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from "../context/userContext.jsx";
import axios from 'axios';

function Navbar() {
    const { user, setUser } = useContext(UserContext);
    const location = useLocation();

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
                window.location.href = `${window.location.origin}/login`;
            })
            .catch((error) => {
                console.error('Error during logout:', error);
            });
    };

    const [navbarActive, setNavbarActive] = useState(false);

    const toggleNavbar = () => {
        setNavbarActive(!navbarActive);
    };

    const handleUserBtnClick = () => {
        const profile = document.querySelector('.profile');
        profile.classList.toggle('active');
    };

    const isLinkActive = (pathname) => {
        return location.pathname === pathname ? 'active' : '';
    };

    return (
        <div>
            <section className="header">
                <div className="flex">
                    <Link to="/" className="logo">Versatile Lodge</Link>
                    <Link to="/room" className="btn">Check Availability</Link>
                    <div
                        className={`menu fas fa-bars ${navbarActive ? 'active' : ''}`}
                        id="menu-btn"
                        onClick={toggleNavbar}
                    ></div>
                </div>

                <nav className={`navbar ${navbarActive ? 'active' : ''}`}>
                    <Link to="/" className={isLinkActive('/')}>Home</Link>
                    <Link to="/about" className={isLinkActive('/about')}>About</Link>
                    <Link to="/room" className={isLinkActive('/room')}>Rooms</Link>
                    <Link to="/contact" className={isLinkActive('/contact')}>Contact</Link>
                    <Link to="/reviews" className={isLinkActive('/reviews')}>Reviews</Link>
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
                            <Link className="option-btn" onClick={handleLogout}>
                                Logout
                            </Link>
                        </div>
                    </div>
                </nav>
            </section>
        </div>
    );
}

export default Navbar;
