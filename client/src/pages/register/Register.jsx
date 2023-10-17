import React, { Fragment } from 'react'

export const Register = () => {
  return (
    <Fragment>
        
        <div class="register-container">
        <div class="image">
            <img src="/assets/images/gallery-img-1.jpg" alt="Lodge Logo" />
            <p class="centered-text">Versatile Lodge</p>
        </div>
        <form action="/login" class="form">
            <h1>Registration Form</h1>
            <div class="name-inputs">
                <div class="input-group">
                    <label for="firstName">First Name:</label>
                    <input type="text" id="firstName" name="firstName" placeholder="First Name" required />
                </div>
                <div class="input-group">
                    <label for="lastName">Last Name:</label>
                    <input type="text" id="lastName" name="lastName" placeholder="Last Name"required />
                </div>
            </div>

            <label for="address">Address:</label>
            <input type="text" id="address" name="address" placeholder="Address" required />

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Email" required />

            <label for="phone">Phone:</label>
            <input type="tel" id="phone" name="phone" placeholder="Phone" required />

            <label for="photo">Photo:</label>
            <input type="file" id="photo" name="photo" placeholder="Address" accept="image/*" />

            <div class="btns">
                <a href="/login" className="login-btn">Login</a>
                <button className="register-btn" type="submit">Register</button>
            </div>
        </form>
    </div>



    </Fragment>   
    )
}
  
export default Register;