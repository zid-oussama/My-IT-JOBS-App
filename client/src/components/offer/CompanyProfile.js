import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createCompanyProfile } from "../../js/actions/offers";
import Spinner from "../layout/Spinner";

const CompanyProfile = () => {
    const dispatch = useDispatch();
    const [company_logo, setcompany_logo] = useState();
    const loading = useSelector((state) => state.profileReducer.laod);
    const [profileData, setprofileData] = useState({
        company_website: "",
        company_location: "",
        company_info: ""
    });
    const { company_website, company_location, company_info } = profileData;

    const handleChange = (e) => {
        setprofileData({ ...profileData, [e.target.name]: e.target.value });
    };
    const handleFileChange = (e) => {
        setcompany_logo(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append("company_logo", company_logo);

        Object.keys(profileData).forEach((key) => fd.append(key, profileData[key]));
        dispatch(createCompanyProfile(fd));

        window.scrollTo(0, 0);
    };

    if (loading) {
        return <Spinner />;
    }
    return (
        <div className="companyProfile">
            <div className="container">
                <h1 className="large text-primary">Create Your Profile</h1>
                <p className="lead">
                    <i className="fas fa-user"></i> Let's get some information to make your profile stand out
                </p>
                <small>* = required field</small>
                <form className="form" onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="form-group">
                        <input
                            type="url"
                            placeholder="Company Website"
                            name="company_website"
                            defaultValue={company_website}
                            onChange={handleChange}
                        />
                        <small className="form-text">company website</small>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Company Location"
                            name="company_location"
                            defaultValue={company_location}
                            onChange={handleChange}
                        />
                        <small className="form-text">Could be the exact location</small>
                    </div>
                    <div className="form-group">
                        <textarea
                            placeholder="Company info"
                            name="company_info"
                            defaultValue={company_info}
                            onChange={handleChange}
                        ></textarea>
                        <small className="form-text">You can add company info ( this will a part of your offers)</small>
                    </div>

                    <div className="form-group">
                        <input type="file" name="company_logo" onChange={handleFileChange} />
                        <small className="form-text">you can add your image here</small>
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

export default CompanyProfile;
