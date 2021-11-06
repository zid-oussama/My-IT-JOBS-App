import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProfile } from "../../js/actions/profile";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";

const EditProfile = () => {
    const dispatch = useDispatch();
    const [profileImage, setprofileImage] = useState();
    const loading = useSelector((state) => state.profileReducer.laod);
    const [toggleSocial, settoggleSocial] = useState(false);
    const [profileData, setprofileData] = useState({
        company: "",
        website: "",
        location: "",
        status: "",
        skills: "",
        githubusername: "",
        bio: "",
        twitter: "",
        facebook: "",
        linkedin: "",
        youtube: "",
        instagram: ""
    });
    const {
        company,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram
    } = profileData;

    const handleChange = (e) => {
        setprofileData({ ...profileData, [e.target.name]: e.target.value });
    };
    const handleFileChange = (e) => {
        setprofileImage(e.target.files[0]);
    };

    const hundleSocial = (e) => {
        e.preventDefault();
        settoggleSocial(!toggleSocial);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append("profileImage", profileImage);

        Object.keys(profileData).forEach((key) => fd.append(key, profileData[key]));
        dispatch(createProfile(fd, false));

        window.scrollTo(0, 0);
    };
    if (loading) {
        return <Spinner />;
    }
    return (
        <div className="editProfile">
            <div className="container">
                <h1 className="large text-primary">Edit Your Profile</h1>
                <p className="lead">
                    <i className="fas fa-user"></i> Let's get some information to make your profile stand out
                </p>
                <small>* = required field</small>
                <form className="form" onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="form-group">
                        <select name="status" defaultValue={status} onChange={handleChange}>
                            <option value="0">* Select Professional Status</option>
                            <option value="Developer">Developer</option>
                            <option value="Junior Developer">Junior Developer</option>
                            <option value="Senior Developer">Senior Developer</option>
                            <option value="Manager">Manager</option>
                            <option value="Student or Learning">Student or Learning</option>
                            <option value="Instructor">Instructor or Teacher</option>
                            <option value="Intern">Intern</option>
                            <option value="Other">Other</option>
                        </select>
                        <small className="form-text">Give us an idea of where you are at in your career</small>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Company"
                            name="company"
                            defaultValue={company}
                            onChange={handleChange}
                        />
                        <small className="form-text">Could be your own company or one you work for</small>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Website"
                            name="website"
                            defaultValue={website}
                            onChange={handleChange}
                        />
                        <small className="form-text">Could be your own or a company website</small>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Location"
                            name="location"
                            defaultValue={location}
                            onChange={handleChange}
                        />
                        <small className="form-text">City & state suggested (eg. Boston, MA)</small>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="* Skills"
                            name="skills"
                            defaultValue={skills}
                            onChange={handleChange}
                        />
                        <small className="form-text">
                            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
                        </small>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Github Username"
                            name="githubusername"
                            defaultValue={githubusername}
                            onChange={handleChange}
                        />
                        <small className="form-text">
                            If you want your latest repos and a Github link, include your username
                        </small>
                    </div>
                    <div className="form-group">
                        <input type="file" name="profileImage" onChange={handleFileChange} />
                        <small className="form-text">you can add your image here</small>
                    </div>
                    <div className="form-group">
                        <textarea
                            placeholder="A short bio of yourself"
                            name="bio"
                            defaultValue={bio}
                            onChange={handleChange}
                        ></textarea>
                        <small className="form-text">Tell us a little about yourself</small>
                    </div>

                    <div className="my-2">
                        <button type="button" className="btn btn-light" onClick={hundleSocial}>
                            Add Social Network Links
                        </button>
                        <span>Optional</span>
                    </div>

                    {toggleSocial && (
                        <>
                            <div className="form-group social-input">
                                <i className="fab fa-twitter fa-2x"></i>
                                <input
                                    type="text"
                                    placeholder="Twitter URL"
                                    name="twitter"
                                    defaultValue={twitter}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group social-input">
                                <i className="fab fa-facebook fa-2x"></i>
                                <input
                                    type="text"
                                    placeholder="Facebook URL"
                                    name="facebook"
                                    defaultValue={facebook}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group social-input">
                                <i className="fab fa-youtube fa-2x"></i>
                                <input
                                    type="text"
                                    placeholder="YouTube URL"
                                    name="youtube"
                                    defaultValue={youtube}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group social-input">
                                <i className="fab fa-linkedin fa-2x"></i>
                                <input
                                    type="text"
                                    placeholder="Linkedin URL"
                                    name="linkedin"
                                    defaultValue={linkedin}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group social-input">
                                <i className="fab fa-instagram fa-2x"></i>
                                <input
                                    type="text"
                                    placeholder="Instagram URL"
                                    name="instagram"
                                    defaultValue={instagram}
                                    onChange={handleChange}
                                />
                            </div>
                        </>
                    )}

                    <Link className="btn btn-light my-1" to="/dashboard_user">
                        Go Back
                    </Link>
                    <input type="submit" className="btn btn-primary my-1" />
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
