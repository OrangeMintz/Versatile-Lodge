import React, { useState } from "react";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import "./401.css";

function navigate(url) {
    window.location.href = url
}

const handleGoBack = () => {
    navigate('/');
};

const Error401 = () => {

    return (
        <div className="fourOOne">
            <div className="wrapper">
                <div style={{ textAlign: 'center', maxWidth: '600px' }}>
                    <h1 style={{ fontSize: '13em', color: '#2B1103' }}>401</h1>
                    <p style={{ fontSize: '3em', color: '#2B1103', marginBottom: "10px" }}>Unauthorized Access</p>
                    <p style={{ fontSize: '2em', color: '#2B1103' }}>
                        Access is denied due to invalid credentials.
                    </p>

                    <button className="btn-back" onClick={handleGoBack} style={{ fontSize: '2em', marginTop: '20px', borderRadius: "3px" }}>
                        Go to Login
                    </button>
                </div>
            </div>
        </div>

    );
};

export default Error401;



