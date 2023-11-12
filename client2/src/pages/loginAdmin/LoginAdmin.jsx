import React from 'react';
import './loginAdmin.css';
import HeaderAdmin from '../../components/HeaderAdmin';
import Sidebar from '../../components/Sidebar';

const LoginAdmin = () => {
    return (
        <div className='loginAdmin' >
            <div className='loginText'>Login As Admin</div>

            <a href="../" className='back'>Back to Dashboard</a>
        </div>
    )
}

export default LoginAdmin;