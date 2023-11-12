import React from 'react';
import './roomsAdmin.css';
import HeaderAdmin from '../../components/HeaderAdmin';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';


const RoomsAdmin = () => {
    return (
        <div>
            <HeaderAdmin />
            <Sidebar />
            Rooms of the Versatile Lodge
            <Footer />

        </div>
    )
}

export default RoomsAdmin;