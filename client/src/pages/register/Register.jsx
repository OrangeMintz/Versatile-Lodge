import { Link } from "react-router-dom";
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import "./register.css";

function Register() {

  const navigate = useNavigate()

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    // photo: '',
  });

  const registerUser = async (e) => {
    e.preventDefault(); // Add this line to prevent the default form submission
    const { name, email, password } = data;

    try {
      const { data } = await axios.post('/register/customer', {
        name,
        email,
        password,
        // photo
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        setData({
          name: '',
          email: '',
          password: '', // Clear the input fields
          // photo: ''
        });
        toast.success('Registration Successful. Welcome!');
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
      <div className="register-container">
        <div className="image">
          {/* <img src="/assets/images/gallery-img-1.jpg" alt="Lodge Logo" /> */}
          <p className="centered-text">Versatile Lodge</p>
        </div>
        <form onSubmit={registerUser} className="form">
          <h1>Registration Form</h1>
          <label htmlFor="name">Full Name:</label>
          <input type='text' id="name" placeholder='Enter Name' value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />

          <label className='label'>Password:</label>
          <input type='password' id="password" placeholder='Enter Password' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />

          <label className='label'>Email:</label>
          <input type='email' id="email" placeholder='Enter Email' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />

          {/* <label className='label'>Photo:</label> */}
          {/* <input type='file' id="photo" value={data.photo} onChange={(e) => setData({ ...data, photo: e.target.value })} /> */}


          <div className="btns">
            <Link to="/login" className="login-btn">
              Login
            </Link>
            <button type='submit' className="register-btn">Register</button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
