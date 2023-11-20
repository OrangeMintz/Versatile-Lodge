import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Navbar from '../../component/Navbar';
import Footer from '../../component/footer';
import { UserContext } from '../../context/userContext';
import './changePassword.css';

const ChangePassword = () => {


  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);


  // Check LOGON
  const [operationsComplete, setOperationsComplete] = useState(false);
  useEffect(() => {
    if (!user) {
      axios
        .get('/profile')
        .then(({ data }) => {
          setUser(data);
        })
        .catch((error) => {
          console.error('Error fetching user profile:', error);
        })
        .finally(() => {
          // Set operationsComplete to true after data fetching is complete
          setOperationsComplete(true);
        });
    }
  }, [user, setUser]);

  useEffect(() => {
    if (operationsComplete && !user) {
      navigate('/login');
    }
  }, [user, operationsComplete, navigate]);

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdatePassword = async (event) => {
    event.preventDefault();

    const { currentPassword, newPassword, confirmNewPassword } = formData;

    try {
      const response = await axios.put(`/updatepassword/${user.id}`, {
        currentPassword,
        newPassword,
        confirmNewPassword,
      });

      const updatedUser = response.data;

      // Assuming you have a setUser function to update the user context
      setUser(updatedUser);
      toast.success('Password changed successfully');
      navigate('/');
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error updating password:', error.response.data);
        toast.error(error.response.data.error || 'An error occurred. Please try again.');
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error updating password: No response received');
        toast.error('No response received from the server. Please try again.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error updating password:', error.message);
        toast.error('An error occurred. Please try again.');
      }
    }
  };


  const handleLogout = () => {
    axios
      .get('/logout')
      .then(() => {
        window.location.href = `${window.location.origin}/`;
      })
      .catch((error) => {
        console.error('Error during logout:', error);
      });
  };


  // Add state variable for input/button disabled status
  const [isFormDisabled, setIsFormDisabled] = useState(user?.googleSign === true);

  // Update disabled status when user.googleSign changes
  useEffect(() => {
    setIsFormDisabled(user?.googleSign === true);
  }, [user]);

  return (
    <div>
      <Navbar />
      {/* Account Settings section */}
      <section className="account-settings">
        <div className="account-menu">
          <div className="profile-picture">
            {!!user && <img src={user.image} alt="Profile Picture" />}
          </div>
          <ul>
            {!!user && (
              <>
                <li>
                  <Link to={`/accountSetting`}>
                    <i className="fas fa-user"></i> Account Details
                  </Link>
                </li>
                <li>
                  <Link to={`/changePassword`}>
                    <i className="fas fa-key"></i> Change Password
                  </Link>
                </li>
                <li>
                  <Link onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="settings">
          <h2>Change Password</h2>
          <form onSubmit={handleUpdatePassword}>
            <label htmlFor="current-password">Current Password:</label>
            <input
              type="password"
              id="current-password"
              name="currentPassword"
              placeholder="********"
              onChange={handleInputChange}
              disabled={isFormDisabled} // Use state variable
            />

            <label htmlFor="new-password">New Password:</label>
            <input
              type="password"
              id="new-password"
              name="newPassword"
              placeholder="********"
              onChange={handleInputChange}
              disabled={isFormDisabled} // Use state variable
            />

            <label htmlFor="confirm-new-password">Confirm New Password:</label>
            <input
              type="password"
              id="confirm-new-password"
              name="confirmNewPassword"
              placeholder="********"
              onChange={handleInputChange}
              disabled={isFormDisabled} // Use state variable
            />
            <button className='btn-update' type="submit"  >Update Password</button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ChangePassword;