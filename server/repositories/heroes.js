'use strict';

const UserModel = require('../models').User;
const HeroeModel = require('../models').Heroe;
const HeroeScoreModel = require('../models').HeroeScore;

module.exports = {
    async findAll() {
        return await HeroeModel.findAll({
            include: ['powers', {
                model: HeroeScoreModel,
                as: 'scores',
                include: [{
                    model: UserModel,
                    as: 'user',
                    attributes: ['name']
                }]
            }],
            order: [
                ['id', 'DESC']
            ]
        });
    },

    async store(heroe) {
        return await HeroeModel.create(heroe);
    },

    async retrieve(id) {
        return await HeroeModel.findByPk(id, {
            include: ["powers", "scores"]
        });
    },

    async update(heroe) {
        await heroe.save();
        return await heroe.reload();
    },

    async addPower(heroe, power) {
        return await heroe.addPowers(power);
    },

    async destroy(heroe) {
        await heroe.destroy();
    }
}
