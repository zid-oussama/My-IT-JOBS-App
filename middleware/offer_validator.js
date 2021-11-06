const { check, validationResult } = require("express-validator");

exports.offerRules = () => [
    check("offerName", "Offer Name is required").notEmpty(),
    check("vacantJobs", "Vacant Jobs is required").notEmpty(),
    check("vacantJobs", "Vacant Jobs should be number").isNumeric(),
    check("experience", "Experience is required").notEmpty(),
    check("jobDescription", "Job Decription is required").notEmpty(),
    check("jobRequirement", "Job Requirement is required").notEmpty()
];

exports.offerValidator = async (req, res, next) => {
    const errors = validationResult(req);
    errors.isEmpty() ? next() : res.status(400).json(errors.array().map((el) => ({ msg: el.msg })));
};
