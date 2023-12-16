import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from "../components/userContext";
import axios from 'axios';
import RandomQuoteModal from './RandomQuoteModal'; 


const HeaderAdmin = () => {
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        if (!user) {
            axios.get('/profile/admin')
                .then(({ data }) => {
                    setUser(data);
                })
                .catch((error) => {
                    console.error('Error fetching user profile:', error);
                });
        }
    }, [user, setUser]);

    const handleLogout = () => {
        axios.get('/logout/admin')
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

    //open & close modal
    const [modal, setModal] = useState(false);

    const handleRandomIconClick = () => {
        setModal(!modal)
    }

    //remove scrollbar if modal is open
    if(modal) {                 
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')

    }



    return (
        <div>
            <header className="headerAdmin">
                <section className="flex">
                    <div className="icons">
                        <div id="menu-btn" className="fas fa-bars" onClick={handleBarsIconClick}></div>
                        <Link to="/dashboard" className="logo">Versatile Lodge</Link>
                    </div>

                    {/* <form action="" method="post" className="search-form">
                        <input className="search-box" type="text" name="search_box" placeholder="search here..." required maxLength="100" />
                        <button type="submit" className="fas fa-search" name="search_box"></button>
                    </form> */}

                    <div className="icons">

                        {/* <div id="search-btn" className="fas fa-search" onClick={handleSearchIconClick}></div> */}
                        <div id="toggle-btn" className="fas fa-sun" onClick={handleSunIconClick}></div>
                        <div id="question-btn" className="fas fa-question" onClick={handleRandomIconClick}></div>
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
                    {/* < RandomQuoteModal /> */}

                </section>
            </header>
            

            {/* {modal && (

                <div className="modalR">
                    <div className="overlayR" onClick={handleRandomIconClick}></div>
                    <div className="modal-contentR">
                        <h2>Hellow Modal</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus suscipit recusandae omnis aliquid modi deserunt, temporibus incidunt adipisci, aperiam delectus iusto saepe exercitationem sit? Consequatur aliquam magni neque enim quisquamLorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus suscipit recusandae omnis aliquid modi deserunt, temporibus incidunt adipisci, aperiam delectus iusto saepe exercitationem sit? Consequatur aliquam magni neque enim quisquam.</p>
                        <button className="close-modalR" onClick={handleRandomIconClick}>close</button>
                    </div>
                </div>
            )} */}

            {modal && (

            <RandomQuoteModal />
            )}
        </div>
    )
}

export default HeaderAdmin;