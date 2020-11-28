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
    }
}
