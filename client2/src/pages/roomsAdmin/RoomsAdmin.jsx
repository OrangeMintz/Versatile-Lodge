import React from 'react';
import './roomsAdmin.css';
import HeaderAdmin from '../../components/HeaderAdmin';
import Sidebar from '../../components/Sidebar';

const RoomsAdmin = () => {
    return (
        <div>
            <HeaderAdmin />
            <Sidebar />
            Rooms of the Versatile Lodge
        </div>
    )
}

export default RoomsAdmin;