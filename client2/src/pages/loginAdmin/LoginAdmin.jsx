import React, { useContext, useEffect, useState } from "react";
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import './loginAdmin.css';
import { UserContext } from "../../components/userContext";

const LoginAdmin = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        username: '',
        password: '',
    })

    const { user, setUser } = useContext(UserContext);
    useEffect(() => {
        if (!user) {
            axios
                .get('/profile/admin')
                .then(({ data }) => {
                    setUser(data);
                })
                .catch((error) => {
                    console.error('Error fetching user profile:', error);
                })
        }
    }, [user, setUser]);

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
            toast.error("You're Already Logged in")
        }
    }, [user, navigate]);
    // Check LOGON


    const loginAdmin = async (e) => {


        e.preventDefault();
        const { username, password } = data;

        try {
            const response = await axios.post('/admin/login', {
                username,
                password
            });

            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                // Clear the input fields by updating the state
                setData({
                    username: '',
                    password: '',
                });
                // Redirect or navigate to the desired page
                navigate('/dashboard');
                toast.success('Login Successful')
            }
        } catch (error) {
            // Handle the error appropriately, e.g., display an error message
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <div className='loginAdmin'>
            <div className="loginAdminContainer">
                <h1 className='heading'>Login as Admin</h1>
                <form onSubmit={loginAdmin}>
                    <label htmlFor="">Username:</label>
                    <input
                        className="inputUserAdmin"
                        placeholder="Enter Username"
                        type="text"
                        value={data.username}
                        onChange={(e) => setData({ ...data, username: e.target.value })}
                    />
                    <label htmlFor="">Password:</label>
                    <input
                        className="inputPasswordAdmin"
                        placeholder="Enter Password"
                        type="password"
                        value={data.password}
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                    />
                    <input type="submit" className='loginAdminBtn' value="Login" />
                </form>
            </div>
        </div>
    )
}

export default LoginAdmin;
