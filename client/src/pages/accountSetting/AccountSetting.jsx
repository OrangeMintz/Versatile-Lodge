import React, { useState, useRef } from 'react';
import "./accountSetting.css";
import { Link } from "react-router-dom";
import Footer from '../../component/footer';
import axios from 'axios';
import Navbar from '../../component/Navbar';

const AccountSetting = () => {


  const fileInputRef = useRef();              //new profile input 
  const profileImageRef = useRef();           //profile img 

  const handleFileInputChange = (event) => {  //file selection 
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const imageURL = URL.createObjectURL(selectedFile);
      profileImageRef.current.src = imageURL;
    }
  };


  const handleLogout = () => {
    axios.get('/logout')
      .then(() => {
        window.location.href = `${window.location.origin}/`;
      })
      .catch((error) => {
        console.error('Error during logout:', error);
      });
  };

  return (
    <div>
      <Navbar />
      {/* <!-- account-settings section --> */}

      <section className="account-settings">

        <div className="account-menu">
          <div className="profile-picture">
            <img src="assets/images/user4.jpg" alt="Profile Picture" ref={profileImageRef} />
            <label htmlFor="profile-picture-input" id="change-picture-label">Change Profile Picture</label>
            <input
              type="file"
              id="profile-picture-input"
              accept="image/*"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleFileInputChange}
            />
          </div>
          <ul>
            <li><Link to="/accountSetting"><i className="fas fa-user"></i> Account Details</Link></li>
            <li><Link to="/changePassword"><i className="fas fa-key"></i> Change Password</Link></li>
            <li><Link onClick={handleLogout}><i className="fas fa-sign-out-alt"></i> Logout</Link></li>
          </ul>
        </div>

        <div className="settings">
          <h2>Account Settings</h2>
          <form>

            <label htmlFor="first-name">Full Name:</label>
            <input
              type="text"
              id="first-name"
              name="first-name"
              placeholder="John"
              required
            />

            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="JohnDoe@student.buksu.edu.ph"
              required
            />

            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Malaybalay, Bukidnon"
            />

            <button type="submit">Update Profile</button>
          </form>
        </div>

      </section>
      <Footer />

    </div>
  );
};

export default AccountSetting;