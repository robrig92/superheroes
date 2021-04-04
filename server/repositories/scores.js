"use strict";

const scoreModel = require('../models').HeroeScore;

module.exports = {
    async find(id) {
        return scoreModel.findByPk(id);
    },

    async store(score) {
        return scoreModel.store(score);
    },

    async update(score) {
        await score.save();
        return await score.reload();
    },

    async destroy(score) {
        return await score.destroy();
    }
}
