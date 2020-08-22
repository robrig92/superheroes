"use strict";
const Heroe = require('../models').Heroe;
const User = require('../models').User;
const HeroeScore = require('../models').HeroeScore;

module.exports = {
    async getAll() {
        try {
            return await Heroe.findAll({
                include: ['powers', {
                    model: HeroeScore,
                    as: 'scores',
                    include: [{
                        model: User,
                        as: 'user',
                        attributes: ['name']
                    }]
                }],
                order: [
                    ['id', 'DESC']
                ]
            });
        } catch(error) {
            throw error;
        }
    }
}
