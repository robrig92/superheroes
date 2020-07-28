const JWT = require('jsonwebtoken');

const validateJwt = (req, res, next) => {
    const bearer = req.header('Authorization');

    if (!bearer) {
        return res.status(403).json({
            message: 'No token received'
        });
    }

    const jwt = bearer.substr(7);

    try {
        const decoded = JWT.verify(jwt, process.env.JWT_SECRET);
        req.sessionUser = decoded;
    } catch(exception) {
        return res.status(500).json({
            err: exception.message
        })
    }

    next();
}

module.exports = {
    validateJwt
}
