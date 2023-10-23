import React, { useRef, useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import './login.css'

import { Link, useNavigate, useLocation } from 'react-router-dom';


function navigate(url) {
    window.location.href = url
}

async function auth() {
    const response = await fetch('http://127.0.0.1:8000/request', { method: 'post' });

    const data = await response.json();
    console.log(data);
    navigate(data.url);

}

const LOGIN_URL = '/api/auth/login/customer'

export const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();

    const location = useLocation();
    const from = location.state?.from?.pathname || "/"


    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    // const [success, setSuccess] = useState(false);


    useEffect(() => {
        userRef.current.focus();
    }, [])


    useEffect(() => {
        setErrMsg('');
    }, [email, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, pwd);
        try {
            const response = await axios.post(LOGIN_URL, JSON.stringify({ email, password: pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true

                }
            );
            console.log(JSON.stringify(response?.data));
            // console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            setAuth({ email, pwd, accessToken });
            console.log(email, pwd);
            setEmail('');
            setPwd('');
            navigate(from, { replace: true });
            // setSuccess(true);
        } catch (err) {
            if (!err.response) {
                setErrMsg('No Server Response')
            }
            else if (err.response?.status === 400) {
                setErrMsg('Missing Email or Password');
            }
            else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            }
            else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }

    }

    return (

        <section>

            <div className="login-container">
                <div className="image">
                    <img src="assets/images/home-img-2.jpg" alt="Lodge Logo" />
                    <p className="centered-text">Versatile Lodge</p>
                </div>
                <div className="form">
                    <h3>Log-in with</h3>
                    <div className="buttons">
                        <a className="btn" onClick={() => auth()}><i className="fab fa-google"></i>google</a>
                        <a href="" className="btn"><i className="fab fa-facebook"></i>facebook</a>
                    </div>
                    <form onSubmit={handleSubmit}>

                        <div className="input-box">
                            <h3 className="title">or sign in with email</h3>
                            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                            <div className="input">
                                <span className="far fa-envelope"></span>
                                {/* <input type="email" name="" placeholder="Email" id="" /> */}
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Email"
                                    ref={userRef}
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required
                                />
                            </div>
                            <div className="input">
                                <span className="fas fa-lock"></span>
                                {/* <input type="password" name="" placeholder="Password" id="" /> */}
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    required
                                />
                            </div>
                            {/* <div className="checkbox">
                                        <input type="checkbox" name="" id="remember" />
                                        <label for="remember">remember me</label>
                                    </div> */}
                            <div className="buttons">
                                <input type="submit" value="Login" className="log-in-btn" />
                                <h3 className="title2">Don't have an account?</h3>
                                <a className="register-btn" href="/register">Register</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </section>
    )
}

export default Login;