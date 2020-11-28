'use strict';

const UserModel = require('../models').User;

module.exports = {
    async findByUsername(username) {
        const user = await UserModel.findOne({
            where: {
                username
            }
        });

        return user;
    },

    async find(id) {
        return await UserModel.findByPk(id);
    },

    async update(user) {
        await user.save();

        return user.reload();
    },

    async destroy(user) {
        user.active = false;

        return this.update(user);
    },

    async getAllActive() {
        const filter = {
            active: true
        };

        return await UserModel.findAll({ where: filter });
    },

    async create(user) {
        return UserModel.create(user);
    }
}
