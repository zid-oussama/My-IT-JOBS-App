import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearProfile, deleteProfile, getCurrentProfile } from "../../js/actions/profile";
import { Link } from "react-router-dom";
import { clearAlert } from "../../js/actions/alert";
import DashboardUserActions from "./DashboardUserActions";
import Experience from "./Experience";
import Education from "./Education";

const Dashboard = () => {
    const { name } = useSelector((state) => state.authReducer.isConnected);
    const profile = useSelector((state) => state.profileReducer.profile);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(clearProfile());
        dispatch(getCurrentProfile());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleCreateProfile = () => {
        dispatch(clearAlert());
    };
    const handleDeleteProfile = (e) => {
        e.preventDefault();
        dispatch(deleteProfile());
    };

    return (
        <div className="dashboard">
            <section className="container">
                <h1 className="large text-primary">Dashboard User</h1>
                <div style={{ display: "flex", justifyContent: "space-between", marginRight: "100px" }}>
                    {" "}
                    <p className="lead">
                        <i className="fas fa-user hide-sm"> </i>
                        {"  "}
                        Welcome <span style={{ textTransform: "capitalize" }}>{name}</span>
                    </p>
                    {profile && (
                        <button className="btn btn-danger" onClick={handleDeleteProfile}>
                            <i className="far fa-trash-alt"></i>
                            {"  "} <span className="hide-sm">Delete Profile</span>
                        </button>
                    )}
                </div>
                {!profile ? (
                    <>
                        <p>You have not yet setup a profile, please add some info</p>
                        <Link to="/create-profile">
                            <button className="btn btn-primary my-1" onClick={handleCreateProfile}>
                                Create Profile
                            </button>
                        </Link>
                    </>
                ) : (
                    <>
                        <DashboardUserActions />
                        {profile && <Experience experience={profile.experience} />}
                        {profile && <Education education={profile.education} />}
                    </>
                )}
            </section>
        </div>
    );
};

export default Dashboard;
