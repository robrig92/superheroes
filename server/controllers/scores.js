"use strict"

const httpResponse = require('../utils/http-response');
const scoresService = require('../services/scores');
const heroesService = require('../services/heroes');

const index = async (req, res) => {
    try {
        const heroeId = req.params.id;

        const heroe = await heroesService.find(heroeId);

        if (!heroe) {
            return httpResponse.notFound(res)();
        }

        const scores = await heroesService.getScores(heroe);

        return httpResponse.ok(res)('', { heroe, scores });
    } catch(err) {
        return httpResponse.error(res)('', { err: err.message });
    }
}

const store = async (req, res) => {
    try {
        const heroeId = req.params.id;
        const { score, comment } = req.body;
        const userId = req.sessionUser.user.id;

        const heroe = await heroesService.find(heroeId);

        if (!heroe) {
            return httpResponse.notFound(res)();
        }

        const newScore = await scoresService.store({
            score,
            comment,
            user_id: userId,
            heroe_id: heroeId
        });

        return httpResponse.ok(res)('', { heroe, score: newScore });
    } catch(err) {
        return httpResponse.error(res)('', { err: err.message });
    }
}

const show = async (req, res) => {
    try {
        const heroeId = req.params.id;
        const scoreId = req.params.score_id;

        const heroe = await heroesService.find(heroeId);

        if (!heroe) {
            return httpResponse.notFound(res)();
        }

        const score = await scoresService.find(scoreId);

        if (!score) {
            return httpResponse.notFound(res)();
        }

        return httpResponse.ok(res)({ heroe, score });
    } catch(err) {
        return httpResponse.error(res)('', { err: err.message });
    }
}

const update = (req, res) => {
    try {
        const heroeId = req.params.id;
        const scoreId = req.params.score_id;

        const body = req.body;

        const heroe = await heroesService.find(heroeId);

        if (!heroe) {
            return httpResponse.notFound(res)();
        }

        const score = await scoresService.find(scoreId);

        if (!score) {
            return httpResponse.notFound(res)();
        }

        const updatedScore = await scoresService.update(score, body);

        return httpResponse.ok(res)('', { heroe, score: updatedScore });
    } catch(err) {
        return httpResponse.error(res)('', { err: err.message });
    }
}

const destroy = async (req, res) => {
    try {
        const heroeId = req.params.id;
        const scoreId = req.params.score_id;

        const heroe = await heroesService.find(heroeId);

        if (!heroe) {
            return httpResponse.notFound(res)();
        }

        const score = scoresService.find(scoreId);

        if (!score) {
            return httpResponse.notFound(res)();
        }

        await scoresService.destroy(score);

        return httpResponse.ok(res)('', { heroes, score });
    } catch(err) {
        return httpResponse.error(res)('', { err: err.message });
    }
}

module.exports = {
    index,
    store,
    show,
    update,
    destroy
}
