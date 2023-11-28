import { useState } from "react";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../component/Navbar";
import Footer from "../../component/footer";
import "./unathorized.css";



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
            <div className="wrapper">
                <div style={{ textAlign: 'center', maxWidth: '600px' }}>
                    <h1 style={{ fontSize: '13em', color: '#2B1103' }}>404</h1>
                    <p style={{ fontSize: '3em', color: '#2B1103' }}>Not Found</p>
                    <p style={{ fontSize: '2em', color: '#2B1103' }}>
                        This resource request could not be found on this server!
                    </p>

                    <button className="btn-back" onClick={handleGoBack} style={{ fontSize: '1.2em', marginTop: '20px' }}>
                        Go Back Home
                    </button>
                </div>
            </div>
            <Footer />
        </>

    );
};

export default Unauthorized;



