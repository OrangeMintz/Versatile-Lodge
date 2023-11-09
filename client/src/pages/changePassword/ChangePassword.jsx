import React, { useState } from 'react';
import "./changePassword.css"
import { Link } from "react-router-dom";
import Footer from '../../component/footer';
import Navbar from '../../component/Navbar';

const ChangePassword = () => {

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

      {/* Account Settings section */}
      <section className="account-settings">
        <div className="account-menu">
          <div className="profile-picture">
            <img src="assets/images/user4.jpg" alt="Profile Picture" />
          </div>
          <ul>
            <li><Link to="/accountSetting"><i className="fas fa-user"></i> Account Details</Link></li>
            <li><Link to="/changePassword"><i className="fas fa-key"></i> Change Password</Link></li>
            <li><Link onClick={handleLogout}><i className="fas fa-sign-out-alt"></i> Logout</Link></li>
          </ul>
        </div>

        <div className="settings">
          <h2>Change Password</h2>
          <form>
            <label htmlFor="current-password">Current Password:</label>
            <input
              type="password"
              id="current-password"
              name="current-password"
              placeholder="********"
              required
            />

            <label htmlFor="new-password">New Password:</label>
            <input
              type="password"
              id="new-password"
              name="new-password"
              placeholder="********"
              required
            />

            <label htmlFor="confirm-new-password">Confirm New Password:</label>
            <input
              type="password"
              id="confirm-new-password"
              name="confirm-new-password"
              placeholder="********"
              required
            />

            <button type="submit">Update Password</button>
          </form>
        </div>
      </section>

      <Footer />

    </div>
  );
};

export default ChangePassword;