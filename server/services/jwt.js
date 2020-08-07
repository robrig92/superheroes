const jsonwebtoken = require('jsonwebtoken');

const createToken = (payload) => {
    const jwt = jsonwebtoken.sign({ ...payload }, process.env.JWT_SECRET, {
        expiresIn: "1000h",
    });

    return jwt;
}

module.exports = {
    createToken
}
