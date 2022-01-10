const jwtAuth = require("./jwtAuth");
const managerAuth = (req, res, next) => jwtAuth(req, res, () => {
    try {
        if (typeof req.user === "undefined" || typeof req.user.usertype === "undefined" || req.user.usertype > process.env.DISTRICT_MANAGERTYPE){
            console.log("Invalid token!", req.user);
            return res.status(404).json({message: process.env.MESSAGE_404});
        }

        next();
    } catch (err) {
        res.status(500).json({message: err.message});
    }

});

module.exports = managerAuth;