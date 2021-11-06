const express = require("express");
const { tokenAuthUser } = require("../../middleware/auth_user");
const router = express.Router();
const {
    profileRules,
    profileValidator,
    experienceRules,
    educationRules
} = require("../../middleware/profile_validator");
const {
    createProfile,
    myProfile,
    seeAllProfiles,
    getProfileById,
    deleteProfile,
    experienceAdd,
    experienceDelete,
    educationAdd,
    educationDelete
} = require("../../controllers/profil_controllers");
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
//@Desc Create or update user profile
//@access private
//@Path : http://localhost:5000/api/profile/me
router.post("/me", tokenAuthUser, upload.single("profileImage"), profileRules(), profileValidator, createProfile);

//@Method GET
//@Desc get current user profile
//@access private
//@Path : http://localhost:5000/api/profile/me
router.get("/me", tokenAuthUser, myProfile);

//@Method DELETE
//@Desc Delete profile
//@access private
//@Path : http://localhost:5000/api/profile/
router.delete("/", tokenAuthUser, deleteProfile);

//@Method PUT
//@Desc Add profile experiences
//@access private
//@Path : http://localhost:5000/api/profile/experience
router.put("/experience", tokenAuthUser, experienceRules(), profileValidator, experienceAdd);

//@Method DELETE
//@Desc Delete experience from profile
//@access private
//@Path : http://localhost:5000/api/profile/experience/:exp_id
router.delete("/experience/:exp_id", tokenAuthUser, experienceDelete);

//@Method PUT
//@Desc Add profile Education
//@access privatee
//@Path : http://localhost:5000/api/profile/education
router.put("/education", tokenAuthUser, educationRules(), profileValidator, educationAdd);

//@Method DELETE
//@Desc Delete experience from profile
//@access private
//@Path : http://localhost:5000/api/profile/education/:exp_id
router.delete("/education/:edu_id", tokenAuthUser, educationDelete);

//@Method GET
//@Desc Get all profiles
//@access private
//@Path : http://localhost:5000/api/profile/
router.get("/", seeAllProfiles);

//@Method GET
//@Desc Get profile by user id
//@access private
//@Path : http://localhost:5000/api/profile/user/:user_id
router.get("/user/:user_id", getProfileById);

module.exports = router;
