'use strict'

const UserRepository = require('../repositories/user');
const PasswordsUtils = require('../utils/passwords');

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

    const user = await UserRepository.findByUsername(username);

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
