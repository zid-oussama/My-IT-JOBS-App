import React from "react";
import { useDispatch } from "react-redux";
import { deleteCompanyOffer } from "../../js/actions/offers";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const CompanyOffers = ({ offers }) => {
    const dispatch = useDispatch();

    const history = useHistory();
    const handleDeleteOffer = (e, id) => {
        e.preventDefault();
        dispatch(deleteCompanyOffer(id, history));
    };
    return (
        <>
            {offers &&
                offers.map((el) => (
                    <table className="table" key={el._id}>
                        <thead className="tbl-header">
                            <tr>
                                <th style={{ backgroundColor: "rgba(255, 255, 255, 0.3)", width: "100px" }}>Offer</th>
                                <th className="hide-sm" style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}>
                                    Job Description
                                </th>
                                <th
                                    className="hide-sm"
                                    style={{ backgroundColor: "rgba(255, 255, 255, 0.3)", width: "150px" }}
                                >
                                    Req Experience
                                </th>
                                <th
                                    className="hide-sm"
                                    style={{ backgroundColor: "rgba(255, 255, 255, 0.3)", width: "100px" }}
                                >
                                    Expires
                                </th>
                                <th style={{ backgroundColor: "rgba(255, 255, 255, 0.3)", width: "100px" }}>Applied</th>
                                <th style={{ width: "100px" }}></th>
                            </tr>
                        </thead>
                        <tbody className="table-content">
                            <tr>
                                <td style={{ textTransform: "capitalize" }}>{el.offerName}</td>
                                <td className="hide-sm" style={{ textTransform: "capitalize", textAlign: "left" }}>
                                    {el.jobDescription}
                                </td>
                                <td className="hide-sm" style={{ textTransform: "capitalize" }}>
                                    {el.experience}
                                </td>
                                <td className="hide-sm">{el.expire}</td>
                                <td style={{ paddingLeft: "15px" }}>
                                    {" "}
                                    <Link to={`/dashboard_company/${el._id}`}>
                                        <button className="btn btn-danger">View</button>
                                    </Link>
                                </td>
                                <td style={{ paddingLeft: "15px" }}>
                                    <button className="btn btn-danger" onClick={(e) => handleDeleteOffer(e, el._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                ))}
        </>
    );
};

export default CompanyOffers;
