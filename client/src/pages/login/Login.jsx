import React, { Fragment } from 'react'
import './login.css'

export const Login = () => {
    return (
        <Fragment>

            <div className="container">

                <form action="/">
                    <div className="links">
                        <h3 className="title">Log-in with</h3>
                        <div className="buttons">
                            <a href="" className="btn"><i className="fab fa-google"></i>google</a>
                            <a href="" className="btn"><i className="fab fa-facebook"></i>facebook</a>
                        </div>
                    </div>

                    <div className="input-box">
                        <h3 className="title">or sign in with email</h3>
                        <div className="input">
                            <span className="far fa-envelope"></span>
                            <input type="email" name="" placeholder="email" id="" />
                        </div>
                        <div className="input">
                            <span className="fas fa-lock"></span>
                            <input type="password" name="" placeholder="password" id="" />
                        </div>
                        <div className="checkbox">
                            <input type="checkbox" name="" id="remember" />
                            <label for="remember">remember me</label>
                        </div>
                        <input type="submit" value="Login" className="log-in-btn" />
                        <h3 className="title">Don't have an account?</h3>
                        <a className="register-btn">Register</a>
                    </div>

                </form>

            </div>

        </Fragment>

    )
}

export default Login;