const mongoose = require("mongoose");

const OfferSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Companie"
    },
    offerName: {
        type: String,
        required: true
    },
    vacantJobs: {
        type: Number,
        required: true
    },
    proposedSalary: {
        type: String
    },
    experience: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    jobRequirement: {
        type: [String],
        required: true
    },
    date: {
        type: String,
        default: new Date(Date.now()).toDateString()
    },
    job_seekers: {
        type: [String]
    },
    expire: {
        type: String,
        default: new Date(Date.now() + 2592000000).toDateString()
    }

    // expireAt: {
    //     type: Date,
    //     default: Date.now,
    //     index: { expires: '60m' },
    // },
});

//database check for expiration every 1min
// OfferSchema.index({ createdAt: 1 }, { expireAfterSeconds: 2592000 })
module.exports = mongoose.model("Offer", OfferSchema);
