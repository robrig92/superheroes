"use strict";
const authService = require('../services/auth');
const jwtService = require('../services/jwt');

const logIn = async (req, res) => {
    let { username, password } = req.body;

    const user = await authService.auth({ username, password });

    if (!user) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }

    const jwt = jwtService.createToken({ user })

    return res.json({
        data: {
            jwt,
            user,
        },
    });
}

module.exports = {
    logIn
}
