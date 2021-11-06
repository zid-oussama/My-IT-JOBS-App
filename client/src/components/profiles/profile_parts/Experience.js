import React from "react";
import ProfileExperience from "./ProfileExperience";

const Experience = ({ profile }) => {
    return (
        <div className="profile-exp  p-2">
            <h2 className="text-primary">Experience</h2>
            {profile.experience.length > 0 ? (
                <>
                    {profile.experience.map((experience) => (
                        <ProfileExperience key={experience._id} experience={experience} />
                    ))}
                </>
            ) : (
                <h4>No experience credentials</h4>
            )}
        </div>
    );
};

export default Experience;
