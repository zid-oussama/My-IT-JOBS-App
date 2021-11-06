const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const Profile = require("../models/Profile");

exports.userRegister = async (req, res) => {
    const { name, email, password, password2 } = req.body;
    const emailLower = email.toLowerCase();
    try {
        const user = await User.findOne({ email: emailLower });
        if (user) {
            return res.status(400).json([{ msg: "User with this email already exist" }]);
        }
        if (password !== password2) {
            return res.status(400).json([{ msg: "Password do not match" }]);
        }
        //gravatar
        const avatar = gravatar.url(emailLower, {
            s: "200", //size   //200px
            r: "g", //rating  //g:suitable for display on all websites with any audience type.
            d: "mp" //default  //mp: (mystery-person)
        });
        //new user
        const newUser = new User({ name, email: emailLower, avatar, password });
        //bcrypt
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);
        //save user
        await newUser.save();
        res.json({ msg: "Registration completed successfully , you can now sign in" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "server error" });
    }
};

exports.userLogin = async (req, res) => {
    const { email, password } = req.body;
    const emailLower = email.toLowerCase();
    try {
        // find if the user exist
        const searchedUser = await User.findOne({ email: emailLower });
        // if the email not exist
        if (!searchedUser) {
            return res.status(400).send([{ msg: "bad credential" }]);
        }
        // password are equal
        const match = await bcrypt.compare(password, searchedUser.password);
        if (!match) {
            return res.status(400).send([{ msg: "bad credential" }]);
        }
        //payload
        const payload = {
            _id: searchedUser._id,
            email: searchedUser.email,
            name: searchedUser.name
        };
        //token       //token and cookie expires same date ( user need to relog after 30 days)
        const token = await jwt.sign(payload, config.get("jwtSecret_user"), { expiresIn: "30day" });
        res.cookie("token", token, { httpOnly: true, expires: new Date(Date.now() + 30 * 24 * 3600000) });
        res.json({ res: searchedUser, msg: `Welcome ${searchedUser.name}` });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "server error" });
    }
};

exports.userDelete = async (req, res) => {
    try {
        await Profile.findOneAndRemove({ user: req.user._id });
        await User.deleteOne({ _id: req.user._id });
        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(0)
        }).json({ msg: "User Deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "server error" });
    }
};
