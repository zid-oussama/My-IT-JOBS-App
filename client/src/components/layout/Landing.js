import React from "react";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Spinner from "./Spinner";
import "./Landing.css";
import bgBootstrap from "./images/illustration-working.svg";
import bg2 from "./images/icon-brand-recognition.svg";
import bg3 from "./images/icon-detailed-records.svg";
import bg4 from "./images/icon-fully-customizable.svg";

const Landing = () => {
    const isAuth = useSelector((state) => state.authReducer.isAuth);
    const isUser = useSelector((state) => state.authReducer.isUser);
    const loading = useSelector((state) => state.authReducer.load);

    if (isAuth === true) {
        if (isUser === true) {
            return <Redirect to="/dashboard_user" />;
        }
        if (isUser === false) {
            return <Redirect to="/dashboard_company" />;
        }
        return <Redirect to="/login" />;
    }
    if (loading) {
        return <Spinner />;
    }
    return (
        <>
            <main>
                <div className="container">
                    <section style={{ paddingBottom: "30px" }}>
                        <div className="first-section">
                            <div>
                                <h1>More than just shorter links</h1>
                                <p>Hiring Faster , Finding a job Faster</p>
                                <Link to="/login">
                                    <button className="btn btn-primary">Start</button>
                                </Link>
                            </div>
                            <img className="hide-sm" src={bgBootstrap} alt="bg boost desktop" />
                        </div>
                    </section>
                </div>

                <div style={{ backgroundColor: "#f0f1f6" }}>
                    <div className="container" style={{ paddingTop: "2rem" }}>
                        <section className="advanced">
                            <div className="advanced-title">
                                <h1>Advanced Statistics</h1>
                                <p>
                                    Track how your links are performing across the web with our advance statistics
                                    dashboard
                                </p>
                            </div>
                            <div className="advanced-items">
                                <div className="advanced-items-item">
                                    <div className="advanced-items-item-icon">
                                        <img src={bg2} alt="" />
                                    </div>
                                    <h2>Company Recognition</h2>
                                    <p>
                                        Boost your comapany with each click. see all profiles. choose poeple that you
                                        want to join you.
                                    </p>
                                </div>
                                <div className="advanced-items-item">
                                    <div className="advanced-items-item-icon">
                                        <img src={bg3} alt="" />
                                    </div>
                                    <h2>Gain time</h2>
                                    <p>
                                        Gain time of making curriculum vitae.Custom your own profile here . See all
                                        companies offers and apply in one click.
                                    </p>
                                </div>
                                <div className="advanced-items-item">
                                    <div className="advanced-items-item-icon">
                                        <img src={bg4} alt="" />
                                    </div>
                                    <h2>Better Link</h2>
                                    <p>
                                        Improve the actions needed for hiring, finding profiles needed faster. we will
                                        be improving our planet daily.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <footer style={{ padding: "10px 0", textAlign: "center", color: "white" }}>
                <p>CopyRight © Oussama 2021</p>
            </footer>
        </>
    );
};

export default Landing;
