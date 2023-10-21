import React, { Fragment, useRef, useState, useEffect } from "react";
import "./register.css";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const NAME_REGEX = /^(?! )(?!.* $)[A-Za-z ]{5,50}$/;

export const Register = () => {
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
    // if button enabled with JS hack
    const v1 = NAME_REGEX.test(name);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    console.log(name, pwd);
    setSuccess(true);
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="#">Sign In</a>
          </p>
        </section>
      ) : (
        <Fragment>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <div className="register-container">
            <div className="image">
              <img src="/assets/images/gallery-img-1.jpg" alt="Lodge Logo" />
              <p className="centered-text">Versatile Lodge</p>
            </div>
            <form onSubmit={handleSubmit} className="form">
              <h1>Registration Form</h1>

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
              {/* <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                required
              /> */}

              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                // ref={userRef}
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
                characters. character.
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
              {/* <input type="text" id="cpassword" name="cpassword" placeholder="Confirm password" required /> */}

              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                required
              />

              <label htmlFor="photo">Photo:</label>
              <input
                type="file"
                id="photo"
                name="photo"
                placeholder="Address"
                accept="image/*"
              />

              {/* <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            Must match the first password input field.
                    </p> */}

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
        </Fragment>
      )}
    </>
  );
};

export default Register;
