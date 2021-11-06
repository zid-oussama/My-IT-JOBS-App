const Profile = require("../models/Profile");
//normalize must be version 5 and below to work with require
const normalize = require("normalize-url");
const axios = require("axios");

exports.myProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user._id }).populate("user", ["name", "avatar"]);
        if (!profile) {
            return res.status(400).json({ res: req.user, msg: "There is no profile for this user" });
        }
        res.json({ res: profile });
    } catch (err) {
        res.status(500).send({ msg: "server error" });
    }
};

exports.createProfile = async (req, res) => {
    // destructure the request
    // spread the rest of the fields we don't need to check
    const { website, skills, youtube, twitter, instagram, linkedin, facebook, ...rest } = req.body;
    const path = req.file ? req.file.path : "";

    // build a profile
    const profileFields = {
        user: req.user._id,
        profileImage: path,
        website: website && website !== "" ? normalize(website, { forceHttps: true }) : "",
        skills: Array.isArray(skills) ? skills : skills.split(",").map((skill) => " " + skill.trim()),
        ...rest
    };
    // Build socialFields object
    const socialFields = { youtube, twitter, instagram, linkedin, facebook };
    // normalize social fields to ensure valid url (normalize_url package)
    for (const [key, value] of Object.entries(socialFields)) {
        if (value && value.length > 0) socialFields[key] = normalize(value, { forceHttps: true });
    }
    // add to profileFields
    profileFields.social = socialFields;
    try {
        let profile = await Profile.findOne({ user: req.user._id });
        //update existing profile
        if (profile) {
            await Profile.findOneAndUpdate({ user: req.user._id }, { $set: profileFields }, { new: true });
        }
        //create
        else {
            profile = new Profile(profileFields);
            await profile.save();
        }
        res.json({ res: profile });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "server error" });
    }
};

exports.seeAllProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find().populate("user", ["name", "avatar"]);
        if (profiles.length === 0) {
            return res.status(400).json([{ msg: "There is no profile" }]);
        }
        res.json({ res: profiles });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "server error" });
    }
};

exports.getProfileById = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate("user", ["name", "avatar"]);
        if (!profile) {
            return res.status(400).json([{ msg: "There is no profile for this user " }]);
        }
        res.json({ res: profile });
    } catch (err) {
        console.log(err.message);
        //when we type unexisting form of id ("azexcer")
        if (err.kind == "ObjectId") {
            return res.status(400).json([{ msg: "Profile not found" }]);
        }
        res.status(500).send({ msg: "server error" });
    }
};

exports.deleteProfile = async (req, res) => {
    try {
        await Profile.findOneAndRemove({ user: req.user._id });
        res.json({ msg: "Profile deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "server error" });
    }
};

exports.experienceAdd = async (req, res) => {
    const { title, company, location, from, to, current, description } = req.body;
    const newExp = { title, company, location, from, to, current, description };
    try {
        const profile = await Profile.findOne({ user: req.user._id });
        if (!profile) {
            return res.status(400).json([{ msg: "You need to create profile for this user first" }]);
        }
        profile.experience.unshift(newExp);
        await profile.save();
        res.json({ res: profile });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "server error" });
    }
};

exports.experienceDelete = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user._id });
        if (!profile) {
            return res.status(400).json([{ msg: "You need to create profile for this user first" }]);
        }
        if (profile.experience.length === 0) {
            return res.status(400).json([{ msg: "There is no experiences to delete" }]);
        }
        const removedIndex = profile.experience.map((i) => i.id).indexOf(req.params.exp_id);
        if (removedIndex === -1) {
            return res.status(400).send({ msg: "You can't do that" });
        }
        profile.experience.splice(removedIndex, 1);
        await profile.save();
        res.json({ res: profile });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "server error" });
    }
};

exports.educationAdd = async (req, res) => {
    const { school, degree, fieldofstudy, from, to, current, description } = req.body;
    const newEdu = { school, degree, fieldofstudy, from, to, current, description };
    try {
        const profile = await Profile.findOne({ user: req.user._id });
        if (!profile) {
            return res.status(400).json([{ msg: "You need to create profile for this user first" }]);
        }
        profile.education.unshift(newEdu);
        await profile.save();
        res.json({ res: profile });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "server error" });
    }
};

exports.educationDelete = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user._id });
        if (!profile) {
            return res.status(400).json([{ msg: "You need to create profile for this user first" }]);
        }
        if (profile.education.length === 0) {
            return res.status(400).json([{ msg: "There is no educations to delete" }]);
        }
        const removedIndex = profile.education.map((i) => i.id).indexOf(req.params.edu_id);
        if (removedIndex === -1) {
            return res.status(400).send([{ msg: "You can't do that" }]);
        }
        profile.education.splice(removedIndex, 1);
        await profile.save();
        res.json({ res: profile });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "server error" });
    }
};

//limited access to API
// exports.githubRepo = async (req, res) => {
//     try {
//         const repo = await axios.get(`https://api.github.com/users/${req.params.username}/repos`);
//         res.send(repo.data);
//     } catch (err) {
//         console.log(err.message);
//         res.status(500).send({ msg: "server error" });
//     }
// };
