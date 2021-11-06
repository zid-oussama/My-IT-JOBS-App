import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import "./profileCard.css";

const ProfileCard = ({
    profile: {
        user: { _id, name, avatar },
        status,
        company,
        location,
        skills,
        profileImage
    }
}) => {
    const loading = useSelector((state) => state.profileReducer.load);

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <div>
                    <div className="card-container">
                        <span className="pro">PRO</span>
                        <img
                            className="round"
                            src={
                                profileImage !== "null" && profileImage !== "undefined"
                                    ? `http://localhost:5000/${profileImage}`
                                    : avatar
                            }
                            alt="user"
                        />
                        <h3 style={{ textTransform: "capitalize" }}>{name}</h3>
                        <h6>{location && <span>{location}</span>}</h6>
                        <p>
                            {" "}
                            {status} {company && <span> at {company}</span>}
                        </p>
                        <div className="buttons">
                            <Link to={`/profile/${_id}`}>
                                {/* send user id */}
                                <button className="primary ghost">View Profile</button>
                            </Link>
                        </div>
                        <div className="cardskills">
                            <h6>Skills</h6>
                            <ul>
                                {skills.map((skill, index) => (
                                    <li key={index}>
                                        {/* <i className="fas fa-check"></i> */}
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProfileCard;

// <div className="profile bg-light">
//     <img
//         src={profileImage ? `http://localhost:5000/${profileImage}` : avatar}
//         alt="avatar"
//         className="round-img"
//     />
//     <div>
//         <h2>{name}</h2>
//         <p>
//             {status} {company && <span> at {company}</span>}
//         </p>
//         <p className="my-1">{location && <span>{location}</span>}</p>
//         <Link to={`/profile/${_id}`} className="btn btn-primary">
//             {/* send user id */}
//             View Profile
//         </Link>
//     </div>
//     <ul>
//         {skills.slice(0, 4).map((skill, index) => (
//             <li key={index} className="text-primary">
//                 <i className="fas fa-check"></i>
//                 {skill}
//             </li>
//         ))}
//     </ul>
// </div>
