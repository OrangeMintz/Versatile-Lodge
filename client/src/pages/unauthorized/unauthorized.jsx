import { useState } from "react";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../component/Navbar";
import Footer from "../../component/footer";



function navigate(url) {
    window.location.href = url
}

const handleGoBack = () => {
    navigate('/');
};

const Unauthorized = () => {
    return (
        <>
            <Navbar />
            <div style={{ textAlign: 'center', marginTop: '10%', marginBottom: ' 10%' }}>
                <h1 style={{ fontSize: '3em', color: 'wheat' }}>Unauthorized</h1>
                <p style={{ fontSize: '1.5em', color: 'wheat' }}>You don't have permission to access this page.</p>
                <button onClick={handleGoBack} style={{ fontSize: '1.2em', marginTop: '20px' }}>
                    Go Back Home
                </button>
            </div>
            <Footer />
        </>

    );
};

export default Unauthorized;



