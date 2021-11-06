import React from "react";

const ProfileAbout = ({
    profile: {
        bio,
        skills,
        user: { name }
    }
}) => {
    return (
        <>
            <div className="profile-about  p-2">
                {bio && (
                    <>
                        <h2 className="text-primary" style={{ textTransform: "capitalize" }}>
                            {name.split(" ")[0]}'s Bio
                        </h2>
                        <p>{bio}</p>
                        <div className="line" />
                    </>
                )}
                <h2 className="text-primary ">Skill Set</h2>
                <div className="skills ">
                    {skills.map((skill, index) => (
                        <div key={index} className="p-1 ">
                            <i className="fas fa-check" /> {skill}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ProfileAbout;
