const jwt = require('jsonwebtoken');

const jwtAuth = (req, res, next) => {
    try {
        const token = req.header("x-auth-token");
        if (!token)
            return res.status(404).json({message: process.env.MESSAGE_404});
        const verified = jwt.verify(token, process.env.JWT_TOKEN);

        if (!verified)
            return res.status(404).json({message: process.env.MESSAGE_404});


        req.user = verified;
        next();
    } catch (err) {
        res.status(500).json({message: err.message});
    }

};

module.exports = jwtAuth;