import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerCompany, registerUser } from "../../js/actions/auth";
import { clearAlert } from "../../js/actions/alert";
import { useHistory } from "react-router";

const Register = () => {
    const history = useHistory();
    const [user, setUser] = useState(true);
    const [registerInfo, setregisterInfo] = useState({});
    const isAuth = useSelector((state) => state.authReducer.isAuth);
    const isUser = useSelector((state) => state.authReducer.isUser);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setregisterInfo({ ...registerInfo, [e.target.name]: e.target.value });
    };
    const registerChange = (e) => {
        e.preventDefault();
        setUser(!user);
        // dispatch(clearAlert())
        // setregisterInfo({})
        // document.getElementById('myform').reset()
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        user ? dispatch(registerUser(registerInfo, history)) : dispatch(registerCompany(registerInfo, history));
        dispatch(clearAlert());
    };

    if (isAuth) {
        if (isUser === true) {
            return <Redirect to="/dashboard_user" />;
        }
        if (isUser === false) {
            return <Redirect to="/dashboard_company" />;
        }
        return <Redirect to="/login" />;
    }

    return (
        <>
            <div className="register">
                <section className="container">
                    <div className="userCompany">
                        <button type="button" className="btn-register" onClick={registerChange}>
                            {!user ? "As a Company" : "As a User"}
                        </button>
                    </div>
                    <p className="lead glow">
                        {user ? <i className="fas fa-user" /> : <i className="far fa-building" />} Create Your Account
                    </p>
                    <form className="form" id="myform" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                className="input-field"
                                type="text"
                                placeholder="Name"
                                name="name"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                className="input-field"
                                type="email"
                                placeholder="Email Address"
                                name="email"
                                onChange={handleChange}
                            />
                            <small className="form-text">
                                This site uses Gravatar so if you want a profile image, use a Gravatar email
                            </small>
                        </div>
                        <div className="form-group">
                            <input
                                className="input-field"
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                className="input-field"
                                type="password"
                                placeholder="Confirm Password"
                                name="password2"
                                onChange={handleChange}
                            />
                        </div>

                        {/* <div className="form-group">
                            <select
                                className="input-field"
                                onChange={(e) => (e.target.value === "User" ? setUser(true) : setUser(false))}
                            >
                                <option style={{ backgroundColor: "transparent" }} value="User">
                                    User
                                </option>
                                <option value="Company">Company</option>
                            </select>
                        </div> */}

                        <input type="submit" className="btn btn-primary" value="Register" />
                    </form>
                    <p className="my-1" style={{ color: "black" }}>
                        Already have an account? <Link to="/login">Sign In</Link>
                    </p>
                </section>
                s
            </div>
        </>
    );
};

export default Register;
