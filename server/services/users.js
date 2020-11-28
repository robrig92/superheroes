'use strict';

const UserRepository = require('../repositories/user');
const PasswordsUtils = require('../utils/passwords');

const activeUsers = async () => {
    return await UserRepository.getAllActive();
};

const create = async (data) => {
    let args = {
        name: data.name,
        email: data.email,
        username: data.username,
        password: PasswordsUtils.hash(data.password)
    };

    return await UserRepository.create(args);
};

const get = async (id) => {
    return await UserRepository.find(id);
};

const update = async (user, data) => {
    const password = data.password || undefined;
    const hashedPassword = password ? PasswordsUtils.hash(password) : undefined;

    user.name = data.name || user.name;
    user.email = data.email || user.email;
    user.password = hashedPassword || user.password;

    return await UserRepository.update(user);
};

const destroy = async (user) => {
    return await UserRepository.destroy(user);
}

module.exports = {
    activeUsers,
    create,
    get,
    update,
    destroy
}
