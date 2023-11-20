import React, { useState } from "react";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import "./404.css";

function navigate(url) {
    window.location.href = url
}

const handleGoBack = () => {
    navigate('/dashboard');
};

const Error404 = () => {

    return (
        <>
            <div className="wrapper">
                <div style={{ textAlign: 'center', maxWidth: '600px' }}>
                    <h1 style={{ fontSize: '13em', color: '#2B1103' }}>404</h1>
                    <p style={{ fontSize: '3em', color: '#2B1103', marginBottom: "10px" }}>Not Found</p>
                    <p style={{ fontSize: '2em', color: '#2B1103' }}>
                        This resource request could not be found on this server!
                    </p>

                    <button className="btn-back" onClick={handleGoBack} style={{ fontSize: '2em', marginTop: '20px', borderRadius: "3px" }}>
                        Go to Dashboard
                    </button>
                </div>
            </div>
        </>

    );
};

export default Error404;



