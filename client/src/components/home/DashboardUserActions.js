import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearAlert } from "../../js/actions/alert";

const DashboardUserActions = () => {
    const dispatch = useDispatch();

    return (
        <div className="dash-buttons">
            <Link to="/edit-profile" className="btn btn-dark" onClick={() => dispatch(clearAlert())}>
                <i className="fas fa-user-circle " /> Edit Profile
            </Link>
            <Link to="/add-experience" className="btn btn-dark" onClick={() => dispatch(clearAlert())}>
                <i className="fab fa-black-tie " /> Add Experience
            </Link>
            <Link to="/add-education" className="btn btn-dark" onClick={() => dispatch(clearAlert())}>
                <i className="fas fa-graduation-cap " /> Add Education
            </Link>
        </div>
    );
};

export default DashboardUserActions;
