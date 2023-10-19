import React, { Fragment } from 'react'
import './login.css'

function navigate(url) {
    window.location.href = url
}

async function auth() {
    const response = await fetch('http://127.0.0.1:8000/request', { method: 'post' });

    const data = await response.json();
    console.log(data);
    navigate(data.url);

}


export const Login = () => {
    return (
        <Fragment>
            <div className="container">
                {/* <button className="btn" onClick={() => auth()}><i className="fab fa-google"></i>google</button> */}

                <form action="/">
                    <div className="links">
                        <h3 className="title">Log-in with</h3>
                        <div className="buttons">
                            <button className="btn" onClick={() => auth()}><i className="fab fa-google"></i>google</button>
                            <button href="" className="btn"><i className="fab fa-facebook"></i>facebook</button>
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
                        <a className="register-btn" href='/register'>Register</a>
                    </div>

                </form>

            </div>

        </Fragment >

    )
}

export default Login;