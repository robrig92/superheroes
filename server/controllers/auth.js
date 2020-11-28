"use strict";
const authService = require('../services/auth');
const jwtService = require('../services/jwt');

const logIn = async (req, res) => {
    let { username, password } = req.body;

    try {
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
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}

module.exports = {
    logIn
}
