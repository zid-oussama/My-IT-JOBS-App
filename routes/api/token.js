const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");

//@Method GET
//@Desc check auth and send who is connected
//@access public
//@Path : http://localhost:5000/api/
router.get("/", (req, res) => {
    if (!req.cookies.token) {
        return res.status(400).json({ msg: "You need to log in" });
    }
    try {
        jwt.verify(req.cookies.token, config.get("jwtSecret_user"), (error, decoded) => {
            if (error) {
                jwt.verify(req.cookies.token, config.get("jwtSecret_company"), (error, decoded) => {
                    if (error) {
                        return res.status(401).json({ msg: "Token is not valid" });
                    } else {
                        return res.json({ res: decoded, isUser: false });
                    }
                });
            } else {
                return res.json({ res: decoded, isUser: true });
            }
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: "server problem" });
    }
});

//@Method POST
//@Desc log out and delete auth
//@access public
//@Path : http://localhost:5000/api/logout
router.post("/logout", async (req, res) => {
    try {
        await res
            .cookie("token", "", {
                httpOnly: true,
                expires: new Date(0)
            })
            .json([{ msg: "Logged out" }]);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "server error" });
    }
});

module.exports = router;
