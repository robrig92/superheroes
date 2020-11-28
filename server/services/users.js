'use strict';

const User = require('../models').User;
const PasswordsUtils = require('../utils/passwords');

const activeUsers = async () => {
    const filter = {
        active: true
    };

    return await User.findAll({ where: filter });
};

const create = async (data) => {
    let args = {
        name: data.name,
        email: data.email,
        username: data.username,
        password: PasswordsUtils.hash(data.password)
    };

    return await User.create(args);
};

const get = async (id) => {
    return await UserModel.findByPk(id);
};

const update = async (user, data) => {
    const password = data.password || undefined;
    const hashedPassword = password ? PasswordsUtils.hash(password) : undefined;

    user.name = data.name || user.name;
    user.email = data.email || user.email;
    user.password = hashedPassword || user.password;

    await user.save();

    return await user.reload();
};

const destroy = async (user) => {
    user.active = false;

    await user.save();

    return await user.reload();
}

module.exports = {
    activeUsers,
    create,
    get,
    update,
    destroy
}
