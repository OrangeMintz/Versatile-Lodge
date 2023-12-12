import { useState } from "react";
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import './login.css';
import { UserContext } from "../../context/userContext";
import { useEffect } from "react";
import { useContext } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const captchaKey = import.meta.env.VITE_REACT_APP_CAPTCHA_KEY;



function navigate(url) {
    window.location.href = url;
}

async function auth() {
    const response = await fetch('http://localhost:8000/request', { method: 'post' });

    const data = await response.json();
    console.log(data);
    navigate(data.url);
}

export const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const { user, setUser } = useContext(UserContext);

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
        }
    }, [user, setUser]);

    useEffect(() => {
        if (user) {
            navigate('/');
            toast.error("You're Already Logged in")
        }
    }, [user, navigate]);

    const loginUser = async (e) => {
        e.preventDefault();

        // Ensure ReCAPTCHA is checked
        if (!captchaIsDone) {
            toast.error("Please complete the reCaptcha verification.");
            return;
        }

        const { email, password } = data;

        try {
            const response = await axios.post('/login/customer', {
                email,
                password
            });

            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                setData({});
                navigate('/');
                toast.success('Login Successful')
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        }
    };

    const [captchaIsDone, setCaptchaDone] = useState(false);

    const captchaOnChange = (value) => {
        setCaptchaDone(true);
    };

    return (
        <div className="login-container-wrapper">
            <div className="login-container">
                <div className="image">
                    <img src="assets/images/home-img-2.jpg" alt="Lodge Logo" />
                    <p className="centered-text">Versatile Lodge</p>
                </div>
                <div className="form">
                    <h3>Log-in with</h3>
                    <div className="buttons">
                        <Link className="btn" onClick={() => auth()}><i className="fab fa-google"></i>google</Link>
                    </div>
                    <form onSubmit={loginUser}>
                        <div className="input-box">
                            <h3 className="title">or sign in with email</h3>
                            <div className="input">
                                <span className="far fa-envelope"></span>
                                <input type="email" id="email" placeholder="Email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
                            </div>
                            <div className="input">
                                <span className="fas fa-lock"></span>
                                <input type='password' id="password" placeholder='Enter Password' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
                            </div>
                            <div className="buttons">
                                <ReCAPTCHA
                                    sitekey={captchaKey}
                                    onChange={captchaOnChange}
                                />                                <input type="submit" value="Login" className="log-in-btn" />
                                <h3 className="title2">Don't have an account?</h3>
                                <Link to="/register" className="register-btn">Register</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;
