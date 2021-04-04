"use strict";

const scoresRepository = require('../repositores/scores');

module.exports = {
    async find(id) {
        return await scoresRepository.find(id);
    },

    async store(score) {
        return await scoresRepository.store(score);
    },

    async update(score, args) {
        score.score = args.score || score.score;
        score.comment = args.comment || score.comment;

        return await scoresRepository.update(score);
    },

    async destroy(score) {
        return await scoresRepository.destroy(score);
    }
}
