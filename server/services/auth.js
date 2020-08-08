'use strict'
const bcrypt = require('bcrypt');
const UserRepository = require('../models').User;

const lookUpUser = async (username) => {
    const user = await UserRepository.findOne({
        where: {
            username: username
        }
    });

    return user;
}

const isCorrectPassword = (userPassword, incomingPassword) => {
    return bcrypt.compareSync(incomingPassword, userPassword);
}

const canLogin = (user) => {
    return user.active;
}

const auth = async (credentials) => {
    const { username, password } = credentials;

    if (!username || !password) {
        return null;
    }

    try {
        const user = await lookUpUser(username);

        if (!user) {
            return null;
        }

        if (!isCorrectPassword(user.password, password)) {
            return null;
        }

        if (!canLogin(user)) {
            return null;
        }

        return user;
    } catch(err) {
        console.log(err);
        return false;
    }
}

module.exports = {
    auth
}
