const jwt = require('jsonwebtoken')
const config = require('config')

exports.tokenAuthUser = async (req, res, next) => {
    //check if there is token
    if (!req.cookies.token) { return res.status(400).json({ msg: "You need to log in" }) }
    try {
        //verify if token is valid 
        jwt.verify(req.cookies.token, config.get('jwtSecret_user'), (error, decoded) => {
            if (error) {
                return res.status(401).json({ msg: 'Token is not valid' });
            } else {
                // decoded contain object (payload) used to make token not all info about user
                req.user = decoded;
                // pass user info in req.user 
                next();
            }
        });
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ msg: "server problem" })
    }
}










