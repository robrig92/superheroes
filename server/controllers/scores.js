"use strict"

const Score = require('../models').HeroeScore;
const httpResponse = require('../utils/http-response');
const heroesRepository = require('../repositories/heroes');

const getScore = (id, callback) => {
    return Score.findByPk(id)
        .then((score) => callback(null, score))
        .catch((err) => callback(err));
}

const index = async (req, res) => {
    try {
        const heroeId = req.params.id;

        const heroe = await heroesRepository.retrieve(heroeId);

        if (!heroe) {
            return httpResponse.notFound(res)();
        }

        const scores = await heroe.getScores({ include: 'user' });

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

        const heroe = heroesRepository.retrieve(heroeId);

        if (!heroe) {
            return httpResponse.notFound(res)();
        }

        const foundScore = await Score.create({
            score,
            comment,
            user_id: userId,
            heroe_id: heroeId
        })

        return httpResponse.ok(res)('', { heroe, score: foundScore });
    } catch(err) {
        return httpResponse.error(res)('', { err: err.message });
    }
}

const show = (req, res) => {
    try {
        const heroeId = req.params.id;
        const scoreId = req.params.score_id;

        const heroe = heroesRepository.retrieve(heroeId);

        if (!heroe) {
            return httpResponse.notFound(res)();
        }

        return getScore(scoreId, (err, score) => {
            if (err) {
                return httpResponse.error(res)({ err });
            }

            if (!score) {
                return httpResponse.notFound(res)();
            }

            return httpResponse.ok(res)({ heroe, score });
        });
    } catch(err) {
        return httpResponse.error(res)('', { err: err.message });
    }
}

const update = (req, res) => {
    try {
        const heroeId = req.params.id;
        const scoreId = req.params.score_id;

        const body = req.body;

        const heroe = heroesRepository.retrieve(heroeId);

        if (!heroe) {
            return httpResponse.notFound(res)();
        }

        return getScore(scoreId, async (err, score) => {
            if (err) {
                return httpResponse.error(res)('', { err });
            }

            if (!score) {
                return httpResponse.notFound(res)();
            }

            score.score = body.score || score.score;
            score.comment = body.comment || score.comment;

            try {
                await score.save();

                return httpResponse.ok(res)('', { heroe, score });
            } catch(err) {
                return httpResponse.error(res)('', { err });
            }
        });
    } catch(err) {
        return httpResponse.error(res)('', { err: err.message });
    }
}

const destroy = async (req, res) => {
    try {
        const heroeId = req.params.id;
        const scoreId = req.params.score_id;

        const heroe = await heroesRepository.retrieve(heroeId);

        if (!heroe) {
            return httpResponse.notFound(res)();
        }

        return getScore(scoreId, async (err, score) => {
            if (err) {
                return httpResponse.error(res)('', { err });
            }

            if (!score) {
                return httpResponse.notFound(res)();
            }

            try {
                await score.destroy();

                return httpResponse.ok(res)('', { heroes, score });
            } catch (err) {
                return httpResponse.error(res)('', { err });
            }
        });
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
