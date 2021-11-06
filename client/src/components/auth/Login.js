import React, { useState } from "react";
import homebanner from "../../img/home-banner@2x.jpg";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { clearAlert } from "../../js/actions/alert";
import { loginCompany, loginUser } from "../../js/actions/auth";
import Spinner from "../layout/Spinner";

const Login = () => {
    const [user, setUser] = useState(true);
    const [loginInfo, setloginInfo] = useState({});
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.authReducer.isAuth);
    const isUser = useSelector((state) => state.authReducer.isUser);
    const loading = useSelector((state) => state.authReducer.load);

    const handleChange = (e) => {
        setloginInfo({ ...loginInfo, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(clearAlert());
        user ? dispatch(loginUser(loginInfo)) : dispatch(loginCompany(loginInfo));
    };
    const registerChange = (e) => {
        e.preventDefault();
        setUser(!user);
        // dispatch(clearAlert())
        // setregisterInfo({})
        // document.getElementById('myform').reset()
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
            {loading ? (
                <Spinner />
            ) : (
                <div className="login" style={{ backgroundImage: `url(${homebanner})` }}>
                    <section className="container">
                        <div className="userCompany">
                            <button type="button" className="btn-register" onClick={registerChange}>
                                {!user ? "As a Company" : "As a User"}
                            </button>
                        </div>
                        <p className="lead glow">
                            {user ? <i className="fas fa-user" /> : <i className="far fa-building" />} Sign In
                        </p>
                        <form className="form" id="myform" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input type="email" placeholder="Email Address" name="email" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <input type="password" placeholder="Password" name="password" onChange={handleChange} />
                            </div>
                            {/* <div className="form-group">
                            <select
                                className="input"
                                onChange={(e) => (e.target.value === "User" ? setUser(true) : setUser(false))}
                            >
                                <option value="User">User</option>
                                <option value="Company">Company</option>
                            </select>
                        </div> */}

                            <input type="submit" className="btn btn-primary" value="Login" />
                        </form>
                        <p className="my-1" style={{ color: "black" }}>
                            Don't have an account? <Link to="/register">Sign Up</Link>
                        </p>
                    </section>
                </div>
            )}
        </>
    );
};

export default Login;
