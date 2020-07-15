"use strict"

const Heroe = require('../models').Heroe;
const Score = require('../models').HeroeScore;

const getHeroe = (id, callback) => {
    return Heroe.findByPk(id)
        .then((heroe) => callback(null, heroe))
        .catch((err) => callback(err))
}

const getScore = (id, callback) => {
    return Score.findByPk(id)
        .then((score) => callback(null, score))
        .catch((err) => callback(err));
}

const index = (req, res) => {
    const heroeId = req.params.id;

    return getHeroe(heroeId, async (err, heroe) => {
        if (err) {
            return res.status(500).json({ err });
        }

        if (!heroe) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        const scores = await heroe.getScores();

        return res.status(200).json({
            heroe,
            scores
        });
    });
}

const store = (req, res) => {
    const heroeId = req.params.id;
    const { score, comment } = req.body;
    const userId = req.sessionUser.id;

    return getHeroe(heroeId, (err, heroe) => {
        if (err) {
            return res.status(500).json({ err });
        }

        if (!heroe) {
            return res.status(404).json({
                message: "Resource not found"
            });
        }

        Score.create({
                score,
                comment,
                user_id: userId,
                heroe_id: heroeId
            })
            .then((score) => res.status(200).json({ heroe, score }))
            .catch((erj) => res.status(500).json({ err }));
    });
}

const show = (req, res) => {
    const heroeId = req.params.id;
    const scoreId = req.params.score_id;

    return getHeroe(heroeId, async (err, heroe) => {
        if (err) {
            return res.status(500).json({ err });
        }

        if (!heroe) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        return getScore(scoreId, (err, score) => {
            if (err) {
                return res.status(500).json({ err });
            }

            if (!score) {
                return res.status(404).json({ message: 'Resource not found' });
            }

            return res.status(200).json({
                heroe,
                score
            });
        });
    });
}

const update = (req, res) => {
    const heroeId = req.params.id;
    const scoreId = req.params.score_id;
    const body = req.body;

    return getHeroe(heroeId, (err, heroe) => {
        if (err) {
            return res.status(500).json({ err });
        }

        if (!heroe) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        return getScore(scoreId, async (err, score) => {
            if (err) {
                return res.status(500).json({ err });
            }

            if (!score) {
                return res.status(404).json({ message: 'Resource not found' });
            }

            score.score = body.score || score.score;
            score.comment = body.comment || score.comment;

            try {
                await score.save();

                return res.status(200).json({
                    heroe,
                    score
                });
            } catch(err) {
                return res.status(500).json({ err });
            }
        });
    });
}

const destroy = (req, res) => {
    const heroeId = req.params.id;
    const scoreId = req.params.score_id;

    return getHeroe(heroeId, (err, heroe) => {
        if (err) {
            return res.status(500).json({ err });
        }

        if (!heroe) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        return getScore(scoreId, async (err, score) => {
            if (err) {
                return res.status(500).json({ err });
            }

            if (!score) {
                return res.status(404).json({ message: 'Resource not found' });
            }

            try {
                await score.destroy();

                return res.status(200).json({
                    heroe,
                    score
                });
            } catch (err) {
                return res.status(500).json({ err });
            }
        });
    });
}

module.exports = {
    index,
    store,
    show,
    update,
    destroy
}
