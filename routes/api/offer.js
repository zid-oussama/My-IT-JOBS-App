const express = require("express");
const {
    getCompanyOffers,
    getAllOffers,
    createCompanyOffer,
    deleteCompanyOffer,
    getOfferById,
    applyOffer
} = require("../../controllers/offer_controllers");
const { tokenAuthCompany } = require("../../middleware/auth_company");
const { tokenAuthUser } = require("../../middleware/auth_user");
const { offerRules, offerValidator } = require("../../middleware/offer_validator");
const router = express.Router();

//@Method GET
//@Desc get company offers
//@access private
//@Path : http://localhost:5000/api/offer/me
router.get("/me", tokenAuthCompany, getCompanyOffers);

//@Method GET
//@Desc get  offer by id
//@access public
//@Path : http://localhost:5000/api/offer/
router.get("/:offer_id", getOfferById);

//@Method GET
//@Desc get all offers
//@access private
//@Path : http://localhost:5000/api/offer/
router.get("/", getAllOffers);

//@Method POST
//@Desc Create company offer
//@access private
//@Path : http://localhost:5000/api/offer/
router.post("/", offerRules(), offerValidator, tokenAuthCompany, createCompanyOffer);

//@Method POST
//@Desc Apply for offer
//@access private
//@Path : http://localhost:5000/api/offer/apply/:offre_id
router.post("/apply/:offer_id", tokenAuthUser, applyOffer);

//@Method DELETE
//@Desc delete company offer
//@access private
//@Path : http://localhost:5000/api/offer/delete/:offer_id
router.delete("/delete/:offer_id", tokenAuthCompany, deleteCompanyOffer);

module.exports = router;
