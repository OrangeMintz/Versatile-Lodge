import React from 'react';
import './reviewsAdmin.css';
import HeaderAdmin from '../../components/HeaderAdmin';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';


const ReviewsAdmin = () => {
    return (
        <div>
            <HeaderAdmin />
            <Sidebar />
            Reviews for the Lodge
            <Footer />
        </div>
    )
}

export default ReviewsAdmin;