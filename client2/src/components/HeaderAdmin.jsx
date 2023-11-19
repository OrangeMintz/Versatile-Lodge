import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from "../components/userContext";
import axios from 'axios';


const HeaderAdmin = () => {
    const { user, setUser } = useContext(UserContext);

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
                toast.success("Logout Successful")
                // Reload the page
                // window.location.reload();
            })
            .catch((error) => {
                console.error('Error during logout:', error);
            });
    };

    const handleUserIconClick = () => {
        const profile = document.querySelector('.profile');
        profile.classList.toggle('active');
    };

    //menu icon beside Versatile Lodge
    const handleBarsIconClick = () => {  //when menu-btn is pressed,,
        const sideBar = document.querySelector('.side-bar');
        const body = document.body;                              //html's body element
        const menu_btn = document.querySelector('#menu-btn');     //selects outside menu-btn

        sideBar.classList.toggle('active');           //activate sidebar          
        body.classList.toggle('active');              //adjust for sidebar appearance
        menu_btn.classList.remove('active');          //remove sidebar icon 

    }
    const handleSearchIconClick = () => {
        const searchForm = document.querySelector('.search-form');
        searchForm.classList.toggle('active');
    }

    const handleSunIconClick = () => {                      //darkmode
        const toggle_btn = document.querySelector('#toggle-btn');
        const dark_mode = localStorage.getItem('dark-mode');
        const body = document.body;                              //html's body element


        const enableDarkMode = () => {
            toggle_btn.classList.replace('fa-sun', 'fa-moon');
            body.classList.add('dark');
            localStorage.setItem('dark-mode', 'enabled');

        }
        const disableDarkMode = () => {
            toggle_btn.classList.replace('fa-moon', 'fa-sun');
            body.classList.remove('dark');
            localStorage.setItem('dark-mode', 'disabled');

        }

        if (dark_mode === 'enabled') {
            enableDarkMode();
        }

        if (dark_mode === 'disabled') {
            enableDarkMode();
        } else {
            disableDarkMode();
        }

    };


    return (
        <div>
            <header className="headerAdmin">
                <section className="flex">
                    <div className="icons">
                        <div id="menu-btn" className="fas fa-bars" onClick={handleBarsIconClick}></div>
                        <Link to="/" className="logo">Versatile Lodge</Link>
                    </div>

                    {/* <form action="" method="post" className="search-form">
                        <input className="search-box" type="text" name="search_box" placeholder="search here..." required maxLength="100" />
                        <button type="submit" className="fas fa-search" name="search_box"></button>
                    </form> */}

                    <div className="icons">

                        {/* <div id="search-btn" className="fas fa-search" onClick={handleSearchIconClick}></div> */}
                        <div id="toggle-btn" className="fas fa-sun" onClick={handleSunIconClick}></div>
                        <div id="question-btn" className="fas fa-question"></div>
                        <div id="user-btn" className="fas fa-user" onClick={handleUserIconClick}></div>
                        {/* <div id="drop-btn" className="fas fa-chevron-down"></div> */}

                    </div>
                    {user && (
                        <div className="profile">
                            <img src={user.image} />
                            <h3>{user.name}</h3>
                            <span>{user.isAdmin && 'Admin'}</span>
                            <span>{user.isManager && 'Manager'}</span>
                            <span>{user.isEmployee && 'Employee'}</span>
                            <Link to="/profile" className="btn">View profile</Link>
                            <div className="flex-btn">
                                <Link onClick={handleLogout} className="option-btn">Logout</Link>
                            </div>
                        </div>
                    )}
                </section>
            </header>
        </div>
    )
}

export default HeaderAdmin;