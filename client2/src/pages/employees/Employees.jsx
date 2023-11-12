import React from 'react';
import './employees.css';
import HeaderAdmin from '../../components/HeaderAdmin';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';


const Employees = () => {
    return (
        <div>
            <HeaderAdmin />
            <Sidebar />
            Employees
            <Footer />
        </div>
    )
}

export default Employees;