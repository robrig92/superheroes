'use strict';

const usersRepository = require('../repositories/user');
const PasswordsUtils = require('../utils/passwords');

const activeUsers = async () => {
    return await usersRepository.getAllActive();
};

const create = async (data) => {
    let args = {
        name: data.name,
        email: data.email,
        username: data.username,
        password: PasswordsUtils.hash(data.password),
        isAdmin: data.isAdmin || false
    };

    return await usersRepository.create(args);
};

const get = async (id) => {
    return await usersRepository.find(id);
};

const update = async (user, data) => {
    const password = data.password || undefined;
    const hashedPassword = password ? PasswordsUtils.hash(password) : undefined;

    user.name = data.name || user.name;
    user.email = data.email || user.email;
    user.password = hashedPassword || user.password;
    user.isAdmin = data.isAdmin || false;

    return await usersRepository.update(user);
};

const destroy = async (user) => {
    return await usersRepository.destroy(user);
}

module.exports = {
    activeUsers,
    create,
    get,
    update,
    destroy
}
