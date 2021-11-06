const express = require("express");
const router = express.Router();
const { tokenAuthCompany } = require("../../middleware/auth_company");
const {
    companyLogIn,
    companyRegister,
    companyDelete,
    getMyCompany,
    companyProfile
} = require("../../controllers/company_controller");
const { registerRules, companyValidator, loginRules } = require("../../middleware/company_validator");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage, limits: { fieldSize: 10 * 1024 * 1024 } });

//@Method POST
//@Desc register new company
//@Access public
//@Path : http://localhost:5000/api/company/register
router.post("/register", registerRules(), companyValidator, companyRegister);

//@Method PUT
//@Desc add company profile new company
//@Access private
//@Path : http://localhost:5000/api/company/profile
router.put("/profile", tokenAuthCompany, upload.single("company_logo"), companyProfile);

//@Method POST
//@Desc Log in company
//@Access public
//@Path : http://localhost:5000/api/company/login
router.post("/login", loginRules(), companyValidator, companyLogIn);

//@Method GET
//@Desc get my company info
//@Access private
//@Path : http://localhost:5000/api/company/me
router.get("/me", tokenAuthCompany, getMyCompany);

//@Method DELETE
//@Desc delete company account
//@Access private
//@Path http://localhost:5000/api/company/delete
router.delete("/delete", tokenAuthCompany, companyDelete);

module.exports = router;
