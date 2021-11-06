import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getOfferById, userApplyOffre } from "../../js/actions/offers";
import { getCurrentProfile } from "../../js/actions/profile";
import Spinner from "../layout/Spinner";
import "./OfferCard.css";

const OfferCard = () => {
    const dispatch = useDispatch();
    const { offer_id } = useParams();
    const offer = useSelector((state) => state.offerReducer.offer);
    const load = useSelector((state) => state.offerReducer.load);
    const isUser = useSelector((state) => state.authReducer.isUser);
    const profile = useSelector((state) => state.profileReducer.profile);

    const handleApply = (e) => {
        e.preventDefault();
        dispatch(userApplyOffre(offer_id));
    };

    useEffect(() => {
        dispatch(getCurrentProfile());
        dispatch(getOfferById(offer_id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    offer && console.log(offer.jobDescription.split("-"));
    return (
        <>
            {load ? (
                <Spinner />
            ) : (
                <>
                    <div className="profileinfo" style={{ backgroundColor: "gainsboro", minHeight: "100vh" }}>
                        <div className="container">
                            <div style={{ textAlign: "center" }}>
                                <Link to="/offers" className="btn btn-ligh">
                                    Back to Offers
                                </Link>
                            </div>
                            {offer && (
                                <>
                                    <h1>About company</h1>
                                    <div className="offer-card-pt1">
                                        <div className="company-image">
                                            {offer.company.company_logo && (
                                                <img
                                                    src={`http://localhost:5000/${offer.company.company_logo}`}
                                                    alt="company logo"
                                                />
                                            )}
                                        </div>
                                        <div style={{ margin: "0 10px" }}>
                                            <h3 style={{ textTransform: "capitalize" }}>{offer.company.name}</h3>
                                            <p style={{ textAlign: "justify", marginBottom: "5px" }}>
                                                {offer.company.company_info}
                                            </p>
                                            <div className="low-part">
                                                {offer.company.company_location && (
                                                    <p> Location : {offer.company.company_location}</p>
                                                )}

                                                {offer.company.company_website && (
                                                    <p> Website : {offer.company.company_website}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <h1>Offer</h1>
                                    <h3 style={{ textTransform: "capitalize" }}>{offer.offerName}</h3>
                                    <h4> Job Description :</h4>
                                    <ul style={{ marginBottom: "20px" }}>
                                        {offer.jobDescription.split("-").map((el, i) => (
                                            <>
                                                <li key={i}>
                                                    <i class="fas fa-check"></i> {el}
                                                </li>
                                            </>
                                        ))}
                                    </ul>
                                    <ul>
                                        <h4> Job Requirement :</h4>
                                        {offer.jobRequirement.map((el, i) => (
                                            <>
                                                <li key={i}>
                                                    <i class="fas fa-check"></i> {el}
                                                </li>
                                            </>
                                        ))}
                                    </ul>
                                    {offer.vacantJobs && (
                                        <>
                                            <h4> Vacant jobs :</h4>

                                            <p>{offer.vacantJobs}</p>
                                        </>
                                    )}
                                    {offer.proposedSalary && (
                                        <>
                                            <h4> Proposite salary :</h4>

                                            <p>{offer.proposedSalary}</p>
                                        </>
                                    )}
                                    {offer.expire && (
                                        <>
                                            <h4> Expire date :</h4>

                                            <p>{offer.expire}</p>
                                        </>
                                    )}

                                    {isUser && profile ? (
                                        <button
                                            className="btn btn-primary"
                                            onClick={handleApply}
                                            style={{ margin: "30px 0" }}
                                        >
                                            Apply for this offer
                                        </button>
                                    ) : null}
                                </>
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default OfferCard;
