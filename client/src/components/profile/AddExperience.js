import React, { useState } from "react";
import { useHistory } from "react-router";
import { addExperience } from "../../js/actions/profile";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../layout/Spinner";

const AddExperience = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.profileReducer.laod);
    const [data, setData] = useState({
        company: "",
        title: "",
        location: "",
        from: "",
        to: "",
        current: false,
        description: ""
    });

    const { company, title, location, from, to, current, description } = data;

    const onChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        window.scrollTo(0, 0);
        e.preventDefault();
        dispatch(addExperience(data, history));
    };

    if (loading) {
        return <Spinner />;
    }
    return (
        <div className="addExperience">
            <div className="container">
                <h1 className="large text-primary">Add An Experience</h1>
                <p className="lead">
                    <i className="fas fa-code-branch" /> Add any developer/programming positions that you have had in
                    the past
                </p>
                <small>* = required field</small>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="text" placeholder="* Job Title" name="title" value={title} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="* Company" name="company" value={company} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Location"
                            name="location"
                            value={location}
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <h4>From Date</h4>
                        <input type="date" name="from" value={from} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <p>
                            <input
                                type="checkbox"
                                name="current"
                                checked={current}
                                value={current}
                                onChange={() => {
                                    setData({ ...data, current: !current });
                                }}
                            />{" "}
                            Current Job
                        </p>
                    </div>
                    <div className="form-group">
                        <h4>To Date</h4>
                        <input type="date" name="to" value={to} onChange={onChange} disabled={current} />
                    </div>
                    <div className="form-group">
                        <textarea
                            name="description"
                            cols="30"
                            rows="5"
                            placeholder="Job Description"
                            value={description}
                            onChange={onChange}
                        />
                    </div>

                    <Link className="btn btn-light my-1" to="/dashboard_user">
                        Go Back
                    </Link>
                    <input type="submit" className="btn btn-primary my-1" />
                </form>
            </div>
        </div>
    );
};

export default AddExperience;
