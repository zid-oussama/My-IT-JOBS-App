import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOffer } from "../../js/actions/offers";
import Spinner from "../layout/Spinner";

const CreateOffer = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.profileReducer.laod);
    const [offer, setoffer] = useState({
        offerName: "",
        vacantJobs: "",
        proposedSalary: "",
        experience: "",
        jobDescription: "",
        jobRequirement: ""
    });
    const { offerName, vacantJobs, proposedSalary, experience, jobDescription, jobRequirement } = offer;
    const handleChange = (e) => {
        setoffer({ ...offer, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createOffer(offer));
        window.scrollTo(0, 0);
    };

    if (loading) {
        return <Spinner />;
    }
    return (
        <div className="createOffer">
            <div className="container">
                <h1 className="large text-primary">Create Your Profile</h1>
                <p className="lead">
                    <i className="fas fa-user"></i> Let's get some information to make your profile stand out
                </p>
                <small>* = required field</small>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="* Offer Name"
                            name="offerName"
                            value={offerName}
                            onChange={handleChange}
                        />
                        <small className="form-text">Could be any offer name.</small>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="* Vacant Jobs"
                            name="vacantJobs"
                            value={vacantJobs}
                            onChange={handleChange}
                        />
                        <small className="form-text">Number of poeple you want to hire for this job.</small>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="* Experience "
                            name="experience"
                            value={experience}
                            onChange={handleChange}
                        />
                        <small className="form-text">Number of years of experience.</small>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="* Job Description"
                            name="jobDescription"
                            value={jobDescription}
                            onChange={handleChange}
                        />
                        <small className="form-text">Please enter a specific job description.</small>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="* Job Requirement"
                            name="jobRequirement"
                            value={jobRequirement}
                            onChange={handleChange}
                        />
                        <small className="form-text">
                            Please use comma separated Requirements. EXPL(degree in computer science,speak fluent
                            English,have experience in cloud dev)
                        </small>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Proposed Salary"
                            name="proposedSalary"
                            value={proposedSalary}
                            onChange={handleChange}
                        />
                        <small className="form-text">you can add salary interval.</small>
                    </div>

                    <Link className="btn btn-light my-1" to="/dashboard_company">
                        Go Back
                    </Link>
                    <input type="submit" className="btn btn-primary my-1" />
                </form>
            </div>
        </div>
    );
};

export default CreateOffer;
