import React from "react";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import { deleteExperience } from "../../js/actions/profile";
import { useHistory } from "react-router";

const Experience = ({ experience }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const handleClick = (e, id) => {
        e.preventDefault();
        dispatch(deleteExperience(id, history));
    };

    const experiences = experience.map((exp) => (
        <tr key={exp._id}>
            <td style={{ textTransform: "capitalize" }}>{exp.company}</td>
            <td style={{ textTransform: "capitalize" }}>{exp.title}</td>
            <td>
                <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
                {exp.to === null ? "Now" : <Moment format="YYYY/MM/DD">{exp.to}</Moment>}
            </td>
            <td className="hide-sm" style={{ textTransform: "capitalize" }}>
                {exp.location}
            </td>
            <td className="hide-sm" style={{ textTransform: "capitalize" }}>
                {exp.description}
            </td>
            <td style={{ textAlign: "center" }}>
                <button className="btn btn-danger" onClick={(e) => handleClick(e, exp._id)}>
                    Delete
                </button>
            </td>
        </tr>
    ));
    return (
        <>
            {experience.length !== 0 && (
                <>
                    <h2 className="table-title " style={{ color: "black" }}>
                        Experience Credentials
                    </h2>
                    <table className="table">
                        <thead className="tbl-header">
                            <tr>
                                <th style={{ backgroundColor: "rgba(255, 255, 255, 0.3)", width: "100px" }}>Company</th>
                                <th style={{ backgroundColor: "rgba(255, 255, 255, 0.3)", width: "150px" }}>Title</th>
                                <th style={{ backgroundColor: "rgba(255, 255, 255, 0.3)", width: "150px" }}>Years</th>
                                <th
                                    className="hide-sm"
                                    style={{ backgroundColor: "rgba(255, 255, 255, 0.3)", width: "100px" }}
                                >
                                    Location
                                </th>
                                <th className="hide-sm" style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}>
                                    Description
                                </th>
                                <th style={{ width: "100px" }}></th>
                            </tr>
                        </thead>
                        <tbody className="table-content">{experiences}</tbody>
                    </table>
                </>
            )}
        </>
    );
};

export default Experience;
