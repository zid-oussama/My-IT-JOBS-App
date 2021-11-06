const bcrypt = require("bcryptjs");
const Company = require("../models/Company");
const jwt = require("jsonwebtoken");
const config = require("config");
const Offer = require("../models/Offer");

exports.companyRegister = async (req, res) => {
    const { name, email, password, password2, company_website, company_location, company_info } = req.body;
    const emaillower = email.toLowerCase();
    try {
        const company = await Company.findOne({ email: emaillower });
        if (company) {
            return res.status(400).json([{ msg: "Company with this email already exist" }]);
        }
        if (password !== password2) {
            return res.status(400).json([{ msg: "Password do not match" }]);
        }
        //new company
        const newCompany = new Company({
            name,
            email: emaillower,
            password,
            company_website,
            company_location,
            company_info
        });
        //bcrypt
        const salt = await bcrypt.genSalt(10);
        newCompany.password = await bcrypt.hash(password, salt);
        //save company
        await newCompany.save();
        res.json({ msg: "Registration completed successfully , you can now sign in" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "server error" });
    }
};

exports.companyProfile = async (req, res) => {
    const { company_website, company_location, company_info } = req.body;
    const path = req.file ? req.file.path : "";
    try {
        const company_profile = { company_website, company_location, company_info, company_logo: path };
        //update existing profile

        await Company.findOneAndUpdate({ _id: req.company._id }, { $set: company_profile }, { new: true });

        company = await Company.findOne({ _id: req.company._id });
        res.json({ res: company });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "server error" });
    }
};

exports.companyLogIn = async (req, res) => {
    const { email, password } = req.body;
    const emaillower = email.toLowerCase();
    try {
        // find if the company exist
        const searchedCompany = await Company.findOne({ email: emaillower });
        // if the email not exist
        if (!searchedCompany) {
            return res.status(400).send([{ msg: "bad credential" }]);
        }
        // password are equal
        const match = await bcrypt.compare(password, searchedCompany.password);
        if (!match) {
            return res.status(400).send([{ msg: "bad credential" }]);
        }
        //payload
        const payload = {
            _id: searchedCompany._id,
            email: searchedCompany.email,
            name: searchedCompany.name
        };
        //token       //token and cookie expires same date ( company need to relog after 30 days)
        const token = await jwt.sign(payload, config.get("jwtSecret_company"), { expiresIn: "30day" });
        res.cookie("token", token, { httpOnly: true, expires: new Date(Date.now() + 30 * 24 * 3600000) });
        res.json({ res: searchedCompany, msg: `Welcome ${searchedCompany.name}` });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "server error" });
    }
};

//get my company
exports.getMyCompany = async (req, res) => {
    try {
        const myCompany = await Company.findById(req.company._id);
        res.json({ res: myCompany });
    } catch (err) {
        console.log(err.messgae);
        res.status(500).json({ msg: "server error" });
    }
};

exports.companyDelete = async (req, res) => {
    try {
        await Offer.findOneAndRemove({ company: req.company._id });
        await Company.deleteOne({ _id: req.company._id });
        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(0)
        }).json({ msg: "Company Account Deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "server error" });
    }
};
