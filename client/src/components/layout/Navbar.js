import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccount, deleteAccountCompany, logout } from "../../js/actions/auth";
import { useHistory } from "react-router";
import planet from "../../img/PLANET IT-logos_white.png";

const Navbar = () => {
    const isAuth = useSelector((state) => state.authReducer.isAuth);
    const isUser = useSelector((state) => state.authReducer.isUser);
    const history = useHistory();
    const dispatch = useDispatch();
    const handleLogOut = (e) => {
        e.preventDefault();
        dispatch(logout(history));
    };
    const handleDeleteAccount = (e) => {
        e.preventDefault();
        isUser ? dispatch(deleteAccount(history)) : dispatch(deleteAccountCompany(history));
    };

    return (
        <nav className="navbar bg-dark ">
            <Link to="/">
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img style={{ width: 40, height: 40, padding: "0 5px" }} src={planet} alt="logo" />
                    <h1 className="hide-sm">Planet IT</h1>
                </div>
            </Link>

            <ul>
                <li>
                    <Link to="/profiles">
                        <i className="fas fa-users"></i>
                        {"  "} <span className="hide-sm"> Profiles</span>
                    </Link>
                </li>
                <li>
                    <Link to="/offers">
                        <i className="fas fa-business-time " />
                        {"  "}
                        <span className="hide-sm"> Offers</span>
                    </Link>{" "}
                </li>
            </ul>
            {isAuth ? (
                <ul>
                    <li>
                        <Link to={isUser ? "/dashboard_user" : "/dashboard_company"}>
                            {isUser ? <i className="fas fa-user"></i> : <i className="far fa-building" />}
                            <span className="hide-sm"> Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <a href="#!" onClick={handleDeleteAccount}>
                            <i className="far fa-trash-alt"></i>
                            <span className="hide-sm"> Delete Account</span>
                        </a>
                    </li>

                    <li>
                        <a href="#!" onClick={handleLogOut}>
                            <i className="fas fa-sign-out-alt"></i>
                            <span className="hide-sm"> Logout</span>
                        </a>
                    </li>
                </ul>
            ) : (
                <>
                    <ul>
                        <li>
                            <Link to="/register">
                                <i className="fas fa-sign-in-alt"></i>
                                {"  "} <span className="hide-sm"> Register</span>
                            </Link>{" "}
                        </li>
                        <li>
                            <Link to="/login">
                                <i className="fas fa-user-plus"></i>
                                {"  "} <span className="hide-sm"> Login</span>
                            </Link>
                        </li>
                    </ul>
                </>
            )}
        </nav>
    );
};

export default Navbar;
