import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from "../components/userContext";
import axios from 'axios';

const Sidebar = () => {
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

    const handleCloseIconClick = () => {
        const sideBar = document.querySelector('.side-bar');
        const body = document.body;
        const menu_btn = document.querySelector('#menu-btn');

        sideBar.classList.toggle('active');
        body.classList.toggle('active');
        menu_btn.classList.add('active');
    };






    return (
        <div className="side-bar">
            {user && (
                <div className="profile">
                    <div className="icons">
                        <div id="close-btn" className="fas fa-times" onClick={handleCloseIconClick}></div>
                    </div>
                    <img src={user.image} alt="" />
                    <h3>{user.name}</h3>
                    <span>{user.isAdmin && 'Admin'}</span>
                    <span>{user.isManager && 'Manager'}</span>
                    <span>{user.isEmployee && 'Employee'}</span>
                    <Link to="/profile" className="btn">View profile</Link>
                </div>
            )}

            {user && user.isAdmin && (
                <nav className="navbar">
                    <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}><i className="fa-solid fa-chart-bar"></i><span>Dashboard</span></Link>
                    <Link to="/employees" className={location.pathname === '/employees' || location.pathname.includes('/employees/archive') ? 'active' : ''}><i className="fas fa-users"></i><span>Employees</span></Link>
                    <Link to="/roomsAvailable" className={location.pathname.includes('/roomsAvailable') || location.pathname.includes('/roomsUnavailable') ? 'active' : ''}><i className="fas fa-bed"></i><span>Rooms</span></Link>
                    <Link to="/transactions/booking" className={location.pathname.includes('/roomsReserved') || location.pathname.includes('/roomsBooking') ? 'active' : ''}><i className="fa-solid fa-credit-card"></i><span>Transactions</span></Link>
                    <Link onClick={handleLogout}><i className="fas fa-power-off"></i><span>Log out</span></Link>
                </nav>
            )}

            {user && user.isManager && (
                <nav className="navbar">
                    <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}><i className="fa-solid fa-chart-bar"></i><span>Dashboard</span></Link>
                    <Link to="/roomsAvailable" className={location.pathname.includes('/roomsAvailable') || location.pathname.includes('/roomsUnavailable') ? 'active' : ''}><i className="fas fa-bed"></i><span>Rooms</span></Link>
                    <Link to="/transactions/booking" className={location.pathname.includes('/roomsReserved') || location.pathname.includes('/roomsBooking') ? 'active' : ''}><i className="fa-solid fa-credit-card"></i><span>Transactions</span></Link>
                    <Link onClick={handleLogout}><i className="fas fa-power-off"></i><span>Log out</span></Link>
                </nav>
            )}

            {/* Employee access
            {user && user.isEmployee && (
                <nav className="navbar">
                    <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}><i className="fa-solid fa-chart-bar"></i><span>Dashboard</span></Link>
                    <Link to="/payroll" className={location.pathname === '/payroll' ? 'active' : ''}><i className="fa-solid fa-peso-sign"></i><span>Payroll</span></Link>
                    <Link onClick={handleLogout}><i className="fas fa-power-off"></i><span>Log out</span></Link>
                </nav>
            )} */}
        </div>
    );
};

export default Sidebar;
