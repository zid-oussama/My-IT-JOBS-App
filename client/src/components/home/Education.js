import React from "react";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import { deleteEducation } from "../../js/actions/profile";
import { useHistory } from "react-router";

const Education = ({ education }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const handleClick = (e, id) => {
        e.preventDefault();
        dispatch(deleteEducation(id, history));
    };

    const educations = education.map((edu) => (
        <tr key={edu._id}>
            <td style={{ textTransform: " capitalize" }}>{edu.school}</td>
            <td style={{ textTransform: "capitalize" }}>{edu.degree}</td>
            <td className="hide-sm" style={{ textTransform: "capitalize" }}>
                {edu.fieldofstudy}
            </td>
            <td>
                <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
                {edu.to === null ? "Now" : <Moment format="YYYY/MM/DD">{edu.to}</Moment>}
            </td>
            <td className="hide-sm" style={{ textTransform: "capitalize" }}>
                {edu.description}
            </td>
            <td style={{ textAlign: "center" }}>
                <button className="btn btn-danger" onClick={(e) => handleClick(e, edu._id)}>
                    Delete
                </button>
            </td>
        </tr>
    ));

    return (
        <>
            {education.length !== 0 && (
                <>
                    <h2 className="table-title " style={{ color: "black" }}>
                        Education Credentials
                    </h2>
                    <table className="table">
                        <thead className="tbl-header">
                            <tr>
                                <th style={{ backgroundColor: "rgba(255, 255, 255, 0.3)", width: "100px" }}>School</th>
                                <th style={{ backgroundColor: "rgba(255, 255, 255, 0.3)", width: "150px" }}>Degree</th>
                                <th
                                    className="hide-sm"
                                    style={{ backgroundColor: "rgba(255, 255, 255, 0.3)", width: "150px" }}
                                >
                                    Field Of Study
                                </th>
                                <th style={{ backgroundColor: "rgba(255, 255, 255, 0.3)", width: "100px" }}>Years</th>
                                <th className="hide-sm" style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}>
                                    Description
                                </th>
                                <th style={{ width: "100px" }}></th>
                            </tr>
                        </thead>
                        <tbody className="table-content">{educations}</tbody>
                    </table>
                </>
            )}
        </>
    );
};

export default Education;
