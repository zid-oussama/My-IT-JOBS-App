const { check, validationResult } = require('express-validator')


exports.profileRules = () => [
    check('status', "Status is required").notEmpty(),
    check('skills', "Skills is required").notEmpty(),
];
exports.experienceRules = () => [
    check('title', "Title is required").notEmpty(),
    check('company', "Company is required").notEmpty(),
    check('from', "From date is required and needs to be from the past").notEmpty(),
    check('from', "From date is required and needs to be from the past").custom((value, { req }) => (req.body.to ? value < req.body.to : true))
]
exports.educationRules = () => [
    check('school', "School is required").notEmpty(),
    check('degree', "Degree is required").notEmpty(),
    check('fieldofstudy', "Field of study is required").notEmpty(),
    check('from', "From date is required and needs to be from the past").notEmpty(),
    check('from', "From date is required and needs to be from the past").custom((value, { req }) => (req.body.to ? value < req.body.to : true))
]

exports.profileValidator = async (req, res, next) => {
    const errors = validationResult(req)
    errors.isEmpty() ? next() : res.status(400).json(errors.array().map(el => ({ "msg": el.msg })))
}