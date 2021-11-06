const express = require("express");
const { registerRules, usersValidator, loginRules } = require("../../middleware/users_validator");
const router = express.Router();
const { userRegister, userLogin, userDelete, userLogout } = require("../../controllers/users_controllers");
const { tokenAuthUser } = require("../../middleware/auth_user");

//@Method POST
//@Desc register new user
//@access public
//@Path : http://localhost:5000/api/users/register
router.post("/register", registerRules(), usersValidator, userRegister);

//@Method POST
//@Desc log in
//@access public
//@Path : http://localhost:5000/api/users/login
router.post("/login", loginRules(), usersValidator, userLogin);

//@Method DELETE
//@Desc delete a user
//@access private
//@Path : http://localhost:5000/api/users/delete/
router.delete("/delete/", tokenAuthUser, userDelete);

module.exports = router;
