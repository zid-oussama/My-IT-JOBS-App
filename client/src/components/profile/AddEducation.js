import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { addEducation } from "../../js/actions/profile";

const AddEducation = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [Data, setData] = useState({
        school: "",
        degree: "",
        fieldofstudy: "",
        from: "",
        to: "",
        current: false,
        description: ""
    });
    const { school, degree, fieldofstudy, from, to, description, current } = Data;

    const onChange = (e) => setData({ ...Data, [e.target.name]: e.target.value });
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addEducation(Data, history));
        window.scrollTo(0, 0);
    };

    return (
        <div className="addEducation">
            <div className="container">
                <h1 className="large text-primary">Add Your Education</h1>
                <p className="lead">
                    <i className="fas fa-code-branch" /> Add any school or bootcamp that you have attended
                </p>
                <small>* = required field</small>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="* School or Bootcamp"
                            name="school"
                            value={school}
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="* Degree or Certificate"
                            name="degree"
                            value={degree}
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="* Field of Study"
                            name="fieldofstudy"
                            value={fieldofstudy}
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
                                onChange={() => setData({ ...Data, current: !current })}
                            />{" "}
                            Current School
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
                            placeholder="Program Description"
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

export default AddEducation;
