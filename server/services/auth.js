'use strict'

const PasswordsUtils = require('../utils/passwords');
const usersRepository = require('../repositories/user');

const isCorrectPassword = (userPassword, incomingPassword) => {
    return PasswordsUtils.compare(incomingPassword, userPassword);
}

const canLogin = (user) => {
    return user.active;
}

const auth = async (credentials) => {
    const { username, password } = credentials;

    if (!username || !password) {
        return null;
    }

    const user = await usersRepository.findByUsername(username);

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
}

module.exports = {
    auth
}
