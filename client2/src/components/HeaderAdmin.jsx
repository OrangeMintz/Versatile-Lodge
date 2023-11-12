import React from 'react';

const HeaderAdmin = () => {

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

    return (
        <div>
            <header className="headerAdmin">
                <section className="flex"> 
                    <div className="icons">
                        <div id="menu-btn" className="fas fa-bars" onClick={handleBarsIconClick}></div>
                        <a href="home.html" className="logo">Versatile Lodge</a>
                    </div>
                    
                    <form action="" method="post" className="search-form">
                        <input type="text" name="search_box" placeholder="search here..." required maxLength="100"/>
                        <button type="submit" className="fas fa-search" name="search_box"></button>
                    </form>
                    
                    <div className="icons">

                        <div id="search-btn" className="fas fa-search"></div>
                        <div id="toggle-btn" className="fas fa-sun"></div>
                        <div id="question-btn" className="fas fa-question"></div>
                        <div id="user-btn" className="fas fa-user" onClick={handleUserIconClick}></div>
                        {/* <div id="drop-btn" className="fas fa-chevron-down"></div> */}

                    </div>
                    
                    <div className="profile">
                        <img src="https://th.bing.com/th/id/OIP.edPmh_52ubwjIDT2YIBjkAAAAA?pid=ImgDet&rs=1"/>
                        <h3>Anzai Mitsuyoshi</h3>
                        <span>admin</span>
                        <a href="#" className="btn">view profile</a>
                        <div className="flex-btn">
                            <a href="#" className="option-btn">login</a>
                            <a href="#" className="option-btn">register</a>

                        </div>
                    </div>
                </section>
            </header>
        </div>
    )
}

export default HeaderAdmin;