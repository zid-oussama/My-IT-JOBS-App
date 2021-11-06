const Offer = require("../models/Offer");

exports.getCompanyOffers = async (req, res) => {
    try {
        const myOffers = await Offer.find({ company: req.company._id }).populate("company", "-password");
        if (myOffers.length === 0) {
            return res.status(400).json([{ msg: "There is no offer for this company." }]);
        }
        res.json({ res: myOffers });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: "server error" });
    }
};

exports.getOfferById = async (req, res) => {
    try {
        const [offer] = await Offer.find({ _id: req.params.offer_id }).populate("company", "-password");

        res.json({ res: offer });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: "server error" });
    }
};

exports.getAllOffers = async (req, res) => {
    try {
        const Offers = await Offer.find().populate("company", "-password");
        if (Offers.length === 0) {
            return res.status(400).json([{ msg: "There is no offer." }]);
        }
        res.json({ res: Offers });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: "server error" });
    }
};

exports.createCompanyOffer = async (req, res) => {
    const { offerName, vacantJobs, proposedSalary, experience, jobDescription, jobRequirement } = req.body;
    try {
        const newOffer = new Offer({
            company: req.company._id,
            offerName,
            vacantJobs,
            proposedSalary,
            experience,
            jobDescription,
            jobRequirement: Array.isArray(jobRequirement)
                ? jobRequirement
                : jobRequirement.split(",").map((jobRequirement) => " " + jobRequirement.trim())
        });
        await newOffer.save();
        res.json({ res: newOffer });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "server error" });
    }
};

exports.applyOffer = async (req, res) => {
    try {
        const userId = req.user._id;
        const offer = await Offer.findById(req.params.offer_id);
        console.log(userId);
        console.log(offer.job_seekers);
        if (offer.job_seekers.includes(`${userId}`)) {
            return res.status(400).json([{ msg: "Already Applied" }]);
        }
        offer.job_seekers.unshift(userId);
        await offer.save();
        res.json([{ msg: "You Applied Successfully" }]);
    } catch (error) {
        console.log(err.message);
        res.status(500).send({ msg: "server error" });
    }
};

exports.deleteCompanyOffer = async (req, res) => {
    try {
        await Offer.findByIdAndDelete(req.params.offer_id);
        const myOffers = await Offer.find({ company: req.company._id }).populate("company", "-password");
        res.json({ res: myOffers, msg: "Offer deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "server error" });
    }
};
