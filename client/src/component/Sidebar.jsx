
const Sidebar = () => {


    //close button INSIDE Sidebar
    const handleCloseIconClick = () => {                        //close sidebar     
        const sideBar = document.querySelector('.side-bar');
        const body = document.body;                                //html's body element
        const menu_btn = document.querySelector('#menu-btn');     //selects outside menu-btn
        
        sideBar.classList.toggle('active');        //remove sidebar          
        body.classList.toggle('active');           //occupy the sidebar
        menu_btn.classList.add('active');          //activate sidebar icon 
    }

    return (
        <div className="side-bar">

        <div className="profile">
        <div className="icons">
            <div id="close-btn" className="fas fa-times" onClick={handleCloseIconClick}></div>
        </div>
            <img src="assets/images/user4.jpg" alt="" />
            <h3>Anzai Mitsuyoshi</h3>
            <span>teacher</span>
            <a href="profile.html" className="btn">view profile</a>
        </div>

        <nav className="navbar">
            <a href="/dashboard"><i className="fas fa-home"></i><span>Home</span></a>
            <a href="/aboutus"><i className="fas fa-question"></i><span>About us</span></a>
            <a href="/roomsA"><i className="fas fa-graduation-cap"></i><span>Rooms</span></a>
            <a href="/employees"><i className="fas fa-chalkboard-user"></i><span>Employees</span></a>
            <a href="/contactus"><i className="fas fa-phone"></i><span>Contact us</span></a>
            <a href="/login"><i className="fas fa-power-off"></i><span>Log out</span></a>

        </nav>

    </div>
    )
}

export default Sidebar;