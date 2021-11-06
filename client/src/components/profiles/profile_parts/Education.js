import React from "react";
import ProfileEducation from "./ProfileEducation";

const Education = ({ profile }) => {
    return (
        <div className="profile-edu  p-2">
            <h2 className="text-primary">Education</h2>
            {profile.education.length > 0 ? (
                <>
                    {profile.education.map((education) => (
                        <ProfileEducation key={education._id} education={education} />
                    ))}
                </>
            ) : (
                <h4>No education credentials</h4>
            )}
        </div>
    );
};

export default Education;
