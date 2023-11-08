import { Link } from "react-router-dom";
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import "./register.css";

function Register() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '', // New state variable for confirm password
  });

  const registerUser = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      // Check if password and confirm password match
      toast.error('Password and Confirm Password do not match');
      return;
    }

    try {
      const { data } = await axios.post('/register/customer', {
        name,
        email,
        password
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        setData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '', // Clear the input fields, including confirm password
        });
        toast.success('Registration Successful');
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
          <p className="centered-text">Versatile Lodge</p>
        </div>
        <form onSubmit={registerUser} className="form">
          <h1>Registration Form</h1>
          <label className="label">Full Name:</label>
          <input type='text' placeholder='Enter Name' value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
          <label className='label'>Email:</label>
          <input type='email' placeholder='Enter Email' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
          <label className='label'>Password:</label>
          <input type='password' placeholder='Enter Password' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
          <label className='label'>Confirm Password:</label>
          <input type='password' placeholder='Confirm Password' value={data.confirmPassword} onChange={(e) => setData({ ...data, confirmPassword: e.target.value })} />

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
