const { check, validationResult } = require("express-validator");

exports.registerRules = () => [
    check("name", "Company name is required").trim().isLength({ min: 3 }),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 })
    // check("company_location", "Please enter your company location").notEmpty(),
    // check("company_info", "Please enter your company info").notEmpty()
];

exports.loginRules = () => [
    check("email", "Please enter your email").isEmail(),
    check("password", "Please enter your password (mini 6 characters)").isLength({ min: 6 })
];

exports.companyValidator = async (req, res, next) => {
    const errors = validationResult(req);
    errors.isEmpty() ? next() : res.status(400).json(errors.array().map((el) => ({ msg: el.msg })));
};
