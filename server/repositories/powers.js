'use strict';

const PowerModel = require('../models').Power;

module.exports = {
    async findAll() {
        return await PowerModel.findAll();
    },

    async store(power) {
        return await PowerModel.create(power);
    },

    async retrieve(id) {
        return await PowerModel.findByPk(id);
    },

    async update(power) {
        await power.save();
        return await power.reload();
    },

    async destroy(power) {
        return await power.destroy();
    }
}
