import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from "../context/userContext.jsx";
import axios from 'axios';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
import { Transformation } from "@cloudinary/url-gen";

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
                // Set the new location
                window.location.href = `${window.location.origin}/`;
                // Reload the page
                // window.location.reload();
            })
            .catch((error) => {
                console.error('Error during logout:', error);
            });
    };

    const navigate = useNavigate();
    const handleLoginClick = () => {
        // Navigate to the login page
        navigate('/login');
        // Reload the page
        window.location.reload();
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
                    <div className="right-buttons">
                        <Link to="/room" className="btn">Check Availability</Link>
                        {!user && (
                            // <Link to="/login" className="btn" style={{ marginLeft: '10px', border: '0px' }}>Login/Register</Link>
                            <p className="btn" style={{ marginLeft: '10px', border: '0px' }} onClick={handleLoginClick}>
                                Login/Register
                            </p>
                        )}
                    </div>

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
                    {user && (
                        <div>
                            <img src={user.image} id="user-btn" alt="user" onClick={handleUserBtnClick} />
                            <div className="profile">
                                <img src={user.image} alt="" />
                                {!!user && <h3>{user.name}</h3>}
                                <span>Client</span>
                                <Link to={`/accountSetting/${user.id}`} className='btn'>View Profile</Link>
                                <div className="flex-btn">
                                    <a href={`/bookingHistory/${user.id}`} className="option-btn">
                                        History
                                    </a>
                                    <Link className="option-btn" onClick={handleLogout}>
                                        Logout
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </nav>
            </section>
        </div>
    );
}

export default Navbar;









// import React, { useContext, useEffect, useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { UserContext } from "../context/userContext.jsx";
// import axios from 'axios';

// import { AdvancedImage } from '@cloudinary/react';
// import { Cloudinary } from "@cloudinary/url-gen";
// import { Transformation } from "@cloudinary/url-gen";

// function Navbar() {
//     const { user, setUser } = useContext(UserContext);
//     const location = useLocation();

//     useEffect(() => {
//         if (!user) {
//             axios.get('/profile')
//                 .then(({ data }) => {
//                     setUser(data);
//                 })
//                 .catch((error) => {
//                     console.error('Error fetching user profile:', error);
//                 });
//         }
//     }, [user, setUser]);

//     const handleLogout = () => {
//         axios.get('/logout')
//             .then(() => {
//                 window.location.href = `${window.location.origin}/`;
//             })
//             .catch((error) => {
//                 console.error('Error during logout:', error);
//             });
//     };

//     const [navbarActive, setNavbarActive] = useState(false);

//     const toggleNavbar = () => {
//         setNavbarActive(!navbarActive);
//     };

//     const handleUserBtnClick = () => {
//         const profile = document.querySelector('.profile');
//         profile.classList.toggle('active');
//     };

//     const isLinkActive = (pathname) => {
//         return location.pathname === pathname ? 'active' : '';
//     };


//     const cld = new Cloudinary({
//         cloud: {
//             cloudName: 'dl0qncxjh'
//         }
//     });

//     // const myImage = cld.image(user.image);

//     return (
//         <div>
//             <section className="header">
//                 <div className="flex">
//                     <Link to="/" className="logo">Versatile Lodge</Link>
//                     <div className="right-buttons">
//                         <Link to="/room" className="btn">Check Availability</Link>
//                         {!user && (
//                             <Link to="/login" className="btn" style={{ marginLeft: '10px', border: '0px' }}>Login/Register</Link>
//                         )}
//                     </div>

//                     <div
//                         className={`menu fas fa-bars ${navbarActive ? 'active' : ''}`}
//                         id="menu-btn"
//                         onClick={toggleNavbar}
//                     ></div>
//                 </div>

//                 <nav className={`navbar ${navbarActive ? 'active' : ''}`}>
//                     <Link to="/" className={isLinkActive('/')}>Home</Link>
//                     <Link to="/about" className={isLinkActive('/about')}>About</Link>
//                     <Link to="/room" className={isLinkActive('/room')}>Rooms</Link>
//                     <Link to="/contact" className={isLinkActive('/contact')}>Contact</Link>
//                     <Link to="/reviews" className={isLinkActive('/reviews')}>Reviews</Link>
//                     {user && (
//                         <div>
//                             <img src={user.image} id="user-btn" alt="user" onClick={handleUserBtnClick} />
//                             <div className="profile">
//                                 <img src={user.image} alt="" />
//                                 {!!user && <h3>{user.name}</h3>}
//                                 <span>Client</span>
//                                 <Link to={`/accountSetting/${user.id}`} className='btn'>View Profile</Link>
//                                 <div className="flex-btn">
//                                     <a href={`/bookingHistory/${user.id}`} className="option-btn">
//                                         History
//                                     </a>
//                                     <Link className="option-btn" onClick={handleLogout}>
//                                         Logout
//                                     </Link>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </nav>
//             </section>
//         </div>
//     );
// }

// export default Navbar;