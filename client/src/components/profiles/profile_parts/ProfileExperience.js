import React from "react";

const ProfileExperience = ({ experience: { company, title, location, to, from, description } }) => {
    return (
        <div>
            <h3 className="text-dark">{company}</h3>
            <p>
                {Intl.DateTimeFormat().format(new Date(from))} -{" "}
                {to ? Intl.DateTimeFormat().format(new Date(to)) : "Now"}
            </p>
            <p>
                {title && (
                    <>
                        {" "}
                        <strong>Position: </strong> {title}
                    </>
                )}
            </p>
            <p>
                {location && (
                    <>
                        {" "}
                        <strong>Location: </strong> {location}
                    </>
                )}
            </p>
            <p>
                {description && (
                    <>
                        {" "}
                        <strong>Description: </strong> {description}
                    </>
                )}
            </p>
        </div>
    );
};

export default ProfileExperience;
