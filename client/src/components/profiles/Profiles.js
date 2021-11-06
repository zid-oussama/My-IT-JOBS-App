import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfiles } from "../../js/actions/profile";
import Spinner from "../layout/Spinner";
import ProfileCard from "./ProfileCard";

const Profiles = () => {
    const dispatch = useDispatch();
    const profiles = useSelector((state) => state.profileReducer.showProfiles);
    const loading = useSelector((state) => state.profileReducer.load);
    useEffect(() => {
        dispatch(getProfiles());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <div className="myProfiles">
                    <div className="container">
                        <h1 className="large text-primary">Profiles</h1>
                        <p className="lead">
                            <i className="fab fa-connectdevelop">Browse and connect with job seekers</i>
                        </p>
                        <div className="profiles">
                            {profiles.length > 0 ? (
                                profiles.map((profile) => <ProfileCard key={profile._id} profile={profile} />)
                            ) : (
                                <h4>No profiles found ...</h4>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Profiles;
