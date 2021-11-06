import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getOfferById } from "../../js/actions/offers";
import { getProfiles } from "../../js/actions/profile";
import ProfileCard from "../profiles/ProfileCard";

const OfferJobSeekers = () => {
    const { offer_id } = useParams();
    const dispatch = useDispatch();
    const offer = useSelector((state) => state.offerReducer.offer);
    const profiles = useSelector((state) => state.profileReducer.showProfiles);

    useEffect(() => {
        dispatch(getOfferById(offer_id, true));
        dispatch(getProfiles());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const x = profiles.filter((el) => offer.job_seekers.includes(el.user._id));
    return (
        <div className="myProfiles">
            <div className="container">
                <h1 className="large text-primary">jobSeekers</h1>
                <p className="lead">
                    <i className="fab fa-connectdevelop">People applied for this offer</i>
                </p>
                <div className="profiles">
                    {" "}
                    {x.length > 0 ? (
                        x.map((profile) => <ProfileCard key={profile._id} profile={profile} />)
                    ) : (
                        <h4>No profiles found ...</h4>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OfferJobSeekers;
