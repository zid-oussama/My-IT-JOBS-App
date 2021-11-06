import React from "react";

const ProfileTop = ({
    profile: {
        status,
        company,
        location,
        website,
        social,
        user: { name, avatar },
        profileImage
    }
}) => {
    return (
        <div className="profile-top  p-2">
            <img
                className="round-img my-1"
                src={profileImage !== "null" ? `http://localhost:5000/${profileImage}` : avatar}
                alt=""
            />
            <h1 className="large" style={{ textTransform: "capitalize", color: "#F17500" }}>
                {name}
            </h1>
            <p className="lead" style={{ textTransform: "capitalize" }}>
                {status} {company ? <span> at {company}</span> : null}
            </p>
            <p>{location ? <span>{location}</span> : null}</p>
            <div className="icons my-1">
                {website ? (
                    <a href={website} target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-globe fa-2x" />
                    </a>
                ) : null}
                {social
                    ? Object.entries(social).map(([key, value]) => (
                          <a key={key} href={value} target="_blank" rel="noopener noreferrer">
                              <i className={`fab fa-${key} fa-2x`}></i>
                          </a>
                      ))
                    : null}
            </div>
        </div>
    );
};

export default ProfileTop;
