import React from 'react';
import './loginAdmin.css';
import HeaderAdmin from '../../components/HeaderAdmin';
import Sidebar from '../../components/Sidebar';

const LoginAdmin = () => {
    return (
        <div className="loginAdmin">
            <div className="loginAdminContainer">
                <h1 className='heading'>Login as Admin</h1>
                <form action="../">
                    <label htmlFor="">Username:</label>
                    <input placeholder="Enter Username" type="text" name="" id="" />
                    <label htmlFor="">Password:</label>
                    <input placeholder="Enter Password" type="password" name="" id="" />
                    <label htmlFor="">Confirm Password:</label>
                    <input placeholder="Confirm Password" type="password" name="" id="" />
                   <input type="submit" className='loginAdminBtn' value="Login"/>
                </form>
            </div>
        </div>
    )
}

export default LoginAdmin;