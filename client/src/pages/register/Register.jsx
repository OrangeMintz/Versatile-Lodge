import React, { useRef, useState, useEffect } from "react";
import "./register.css";
import axios from "../../api/axios";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const NAME_REGEX = /^(?! )[A-Z][A-Za-z ]{5,50}(?<! )$/;

const REGISTER_URL = "/api/auth/register/customer";

function Register() {
  const userRef = useRef();
  const errRef = useRef();

  const [name, setname] = useState("");
  const [validname, setValidname] = useState(false);
  const [nameFocus, setnameFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidname(NAME_REGEX.test(name));
  }, [name]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = NAME_REGEX.test(name);
    const v2 = PWD_REGEX.test(pwd);

    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ name, password: pwd, email, photo }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Email Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="#">Sign In</a>
          </p>
        </section>
      ) : (
        <div>

          <div className="register-container">
            <div className="image">
              {/* <img src="/assets/images/gallery-img-1.jpg" alt="Lodge Logo" /> */}
              <p className="centered-text">Versatile Lodge</p>
            </div>
            <form onSubmit={handleSubmit} className="form">
              <h1>Registration Form</h1>
              <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive"> {errMsg} </p>
              <label htmlFor="name">Full Name:</label>
              <input
                type="text"
                id="name"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setname(e.target.value)}
                value={name}
                required
                aria-invalid={validname ? "false" : "true"}
                aria-describedby="fidnote"
                placeholder="Full Name"
                onFocus={() => setnameFocus(true)}
                onBlur={() => setnameFocus(false)}
              />
              <p
                id="namenote"
                className={
                  nameFocus && name && !validname ? "instructions" : "offscreen"
                }
              >
                5 and 50 characters
                <br />
                Name must start with a capital letter and contain only letters.
                <br />
                No Leading and Trailing spaces
              </p>

              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                placeholder="Password"
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              <p
                id="pwdnote"
                className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
              >
                3 to 20 characters.
                <br />
                First name must contain only letters and be between 3 and 20
                characters.
                <br />
                Allowed special characters:{" "}
                <span aria-label="exclamation mark">!</span>{" "}
                <span aria-label="at symbol">@</span>{" "}
                <span aria-label="hashtag">#</span>{" "}
                <span aria-label="dollar sign">$</span>{" "}
                <span aria-label="percent">%</span>
              </p>

              <label htmlFor="confirmpassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmpassword"
                onChange={(e) => setMatchPwd(e.target.value)}
                value={matchPwd}
                required
                placeholder="Confirm Password"
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <p
                id="confirmnote"
                className={
                  matchFocus && !validMatch ? "instructions" : "offscreen"
                }
              >
                Must match the first password input field.
              </p>

              <label htmlFor="email">Email:</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                id="email"
                name="email"
                placeholder="Email"
                required
              />

              <label htmlFor="photo">Photo:</label>
              <input
                type="file"
                id="photo"
                onChange={(e) => setPhoto(e.target.value)}
                value={photo}
                name="photo"
                placeholder="Address"
                accept="image/*"
              />

              <div className="btns">
                <a href="/login" className="login-btn">
                  Login
                </a>
                <button
                  disabled={!validPwd || !validMatch ? true : false}
                  className="register-btn"
                  type="submit"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
