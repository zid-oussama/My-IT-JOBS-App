import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOffers } from "../../js/actions/offers";
import { Link } from "react-router-dom";
import "./AllOffers.css";
import { clearAlert } from "../../js/actions/alert";

const AllOffers = () => {
    const dispatch = useDispatch();
    const allOffers = useSelector((state) => state.offerReducer.showOffers);
    useEffect(() => {
        dispatch(getAllOffers());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="allOffers">
            <div className="container">
                {allOffers &&
                    allOffers.map((el) => (
                        <div key={el._id} className="offer-container">
                            <img src={`http://localhost:5000/${el.company.company_logo}`} alt="" />
                            <div className="sub-container">
                                <div className="pt1">
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <h1>{el.offerName.toUpperCase()}</h1>
                                        <Link to={`/offer/${el._id}`}>
                                            {" "}
                                            <button className="btn btn-light" onClick={() => dispatch(clearAlert())}>
                                                show details
                                            </button>
                                        </Link>
                                    </div>

                                    <small style={{ textTransform: "capitalize" }}>{el.company.name}</small>
                                    <br />
                                    <p>{el.jobDescription.split(" ").slice(0, 30).join(" ") + "..."}</p>
                                </div>
                                <div className="pt2">
                                    <div>
                                        <i className="far fa-clock"></i> {el.expire}
                                    </div>
                                    <div>
                                        <i className="fas fa-map-marker"></i> {el.company.company_location}
                                    </div>
                                    {el.proposedSalary && (
                                        <div>
                                            <i className="far fa-money-bill-alt"></i>
                                            {el.proposedSalary}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default AllOffers;
