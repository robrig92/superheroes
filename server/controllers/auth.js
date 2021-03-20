"use strict";

const authService = require('../services/auth');
const jwtService = require('../services/jwt');
const httpResponse = require('../utils/http-response');

const logIn = async (req, res) => {
    let { username, password } = req.body;

    try {
        const user = await authService.auth({ username, password });

        if (!user) {
            return httpResponse.error(res)('Unauthorized');
        }

        const jwt = jwtService.createToken({ user })

        return httpResponse.ok(res)('', { jwt, user });
    } catch (error) {
        return httpResponse.error(res)(error.message);
    }
}

module.exports = {
    logIn
}
