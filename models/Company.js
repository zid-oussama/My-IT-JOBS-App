const mongoose = require("mongoose");

const CompanyScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    company_website: {
        type: String
    },
    company_location: {
        type: String
    },
    company_info: {
        type: String
    },
    company_logo: {
        type: String
    },

    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model("Companie", CompanyScheme);
