import React, { useEffect } from "react";
import { useParams } from "react-router";
import { clearProfile, getProfileById } from "../../js/actions/profile";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import ProfileTop from "./profile_parts/ProfileTop";
import ProfileAbout from "./profile_parts/ProfileAbout";
import Experience from "./profile_parts/Experience";
import Education from "./profile_parts/Education";

const ProfileInfo = () => {
    const dispatch = useDispatch();
    // const isAuth = useSelector((state) => state.authReducer.isAuth);
    const loading = useSelector((state) => state.profileReducer.load);
    const profile = useSelector((state) => state.profileReducer.profile);
    const { id } = useParams();

    useEffect(() => {
        dispatch(clearProfile());
        dispatch(getProfileById(id)); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {profile === null || loading ? (
                <Spinner />
            ) : (
                <div className="profileinfo" style={{ backgroundColor: "gainsboro" }}>
                    <div className="container">
                        <div style={{ textAlign: "center" }}>
                            <Link to="/profiles" className="btn btn-ligh">
                                Back to Profiles
                            </Link>
                        </div>

                        {profile && (
                            <div className="profile-grid my-1">
                                <ProfileTop profile={profile} />
                                <ProfileAbout profile={profile} />
                                <Experience profile={profile} />
                                <Education profile={profile} />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default ProfileInfo;
