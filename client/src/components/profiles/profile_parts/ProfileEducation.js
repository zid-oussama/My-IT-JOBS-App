import React from "react";

const ProfileEducation = ({ education: { school, degree, fieldofstudy, to, from, description } }) => {
    return (
        <div>
            <h3 className="text-dark">{school}</h3>
            <p>
                {Intl.DateTimeFormat().format(new Date(from))} -{" "}
                {to ? Intl.DateTimeFormat().format(new Date(to)) : "Now"}
            </p>
            <p>
                <strong>Degree: </strong> {degree}
            </p>
            <p>
                {fieldofstudy && (
                    <>
                        <strong>Field Of Study: </strong> {fieldofstudy}
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

export default ProfileEducation;
