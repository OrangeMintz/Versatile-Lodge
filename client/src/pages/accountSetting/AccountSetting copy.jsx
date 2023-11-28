import React, { useState, useRef, useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Navbar from '../../component/Navbar';
import Footer from '../../component/footer';
import { UserContext } from '../../context/userContext';
import './accountSetting.css';

const AccountSetting = () => {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
  });

  const [file, setFile] = useState(null);
  const [image, setImage] = useState('');

  useEffect(() => {
    if (!user) {
      axios
        .get('/profile')
        .then(({ data }) => {
          setUser(data);
        })
        .catch((error) => {
          console.error('Error fetching user profile:', error);
        });
    }
  }, [user, setUser]);

  const fileInputRef = useRef();
  const profileImageRef = useRef();

  const handleFileInputChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const imageURL = URL.createObjectURL(selectedFile);
      profileImageRef.current.src = imageURL;
      setFile(selectedFile);
      console.log('Selected file:', selectedFile);  // Add this line for logging
    }
  };

  // New function to log file changes
  const logFileChanges = () => {
    console.log('File:', file);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async (event) => {
    event.preventDefault();

    // Validation
    if (formData.name && formData.name.trim() !== formData.name) {
      toast.error('Name should not contain leading/trailing spaces');
      return;
    }

    if (formData.name && formData.name.length < 3) {
      toast.error('Invalid Name');
      return;
    }

    const nameRegex = /^[a-zA-Z\s.]*$/; // This regex allows letters, spaces, and dots
    if (formData.name && !nameRegex.test(formData.name)) {
      toast.error('Name should only contain letters');
      return;
    }

    if (formData.address && formData.address.length < 10) {
      toast.error('Invalid Address');
      return;
    }

    // Similar validation for email and address

    // Extract user ID from the URL
    const userId = location.pathname.split('/').pop();

    // Check if userId is available
    if (!userId) {
      console.error('User ID is undefined.');
      return;
    }

    try {
      // Check if a new file is selected
      console.log('Form data:', formData);  // Add this line for logging
      console.log('File:', file);  // Add this line for logging

      if (file) {
        const formDataObject = new FormData();
        formDataObject.append('name', formData.name);
        formDataObject.append('email', formData.email);
        formDataObject.append('address', formData.address);
        formDataObject.append('image', file);  // Append the file to formData

        const response = await axios.put(`/update/${userId}`, formDataObject);

        const updatedUser = response.data;
        setUser(updatedUser);

        const updatedTokenCookie = response.headers['set-cookie'];
        document.cookie = updatedTokenCookie;

        console.log('User updated:', updatedUser);
        toast.success('Account Details Change Successfully');
        navigate('/');
      } else {
        // If no new file, just update text fields
        const response = await axios.put(`/update/${userId}`, formData);

        const updatedUser = response.data;
        setUser(updatedUser);

        const updatedTokenCookie = response.headers['set-cookie'];
        document.cookie = updatedTokenCookie;

        console.log('User updated:', updatedUser);
        toast.success('Account Details Change Successfully');
        navigate('/');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('An error occurred. Please try again.');
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

  return (
    <div>
      <Navbar />
      <section className="account-settings">
        <div className="account-menu">
          <div className="profile-picture">
            {!!user && <img src={user.image} alt="Profile Picture" ref={profileImageRef} />}
          </div>
          <ul>
            {!!user && (
              <>
                <li>
                  <Link to={`/accountSetting/${user.id}`}>
                    <i className="fas fa-user"></i> Account Details
                  </Link>
                </li>
                <li>
                  <Link to={`/changePassword/${user.id}`}>
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
          <h2>Account Settings</h2>
          <form onSubmit={handleUpdateProfile} encType="multipart/form-data">
            {!!user && (
              <>
                <label htmlFor="first-name">Full Name:</label>
                <input
                  type="text"
                  id="first-name"
                  name="name"
                  placeholder={user.name}
                  value={formData.name}
                  onChange={handleInputChange}
                />

                <label htmlFor="email">Email Address:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={user.email}
                  value={formData.email}
                  onChange={handleInputChange}
                />

                <label htmlFor="address">Address:</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder={user.address}
                  value={formData.address}
                  onChange={handleInputChange}
                />

                <label htmlFor="profile-picture-input" id="change-picture-label">
                  Change Profile Picture
                </label>
                <input
                  type="file"
                  id="profile-picture-input"
                  name="image"  // Set the name attribute to match the backend schema
                  accept="image/*"
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                  onChange={(e) => {
                    handleFileInputChange(e);
                    logFileChanges();  // Add this line for logging file changes
                  }}
                />
              </>
            )}

            <button type="submit">Update Profile</button>
          </form>

          <div key={image._id}>
            <img src={image} alt="" />
          </div>

        </div>

      </section>
      <Footer />
    </div>
  );
};

export default AccountSetting;
