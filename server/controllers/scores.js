"use strict"

const Score = require('../models').HeroeScore;
const heroesRepository = require('../repositories/heroes');

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

const index = async (req, res) => {
    try {
        const heroeId = req.params.id;

        const heroe = await heroesRepository.retrieve(heroeId);

        if (!heroe) {
            return res.status(404).json({ mesage: 'Resource not found' });
        }

        const scores = await heroe.getScores({ include: 'user' });

        return res.status(200).json({
            heroe,
            scores
        });
    } catch(err) {
        return res.status(500).json({err: err.message});
    }
}

const store = async (req, res) => {
    try {
        const heroeId = req.params.id;
        const { score, comment } = req.body;
        const userId = req.sessionUser.user.id;

        const heroe = heroesRepository.retrieve(heroeId);

        if (!heroe) {
            return res.status(404).json({
                message: "Resource not found"
            });
        }

        const foundScore = await Score.create({
            score,
            comment,
            user_id: userId,
            heroe_id: heroeId
        })

        return res.status(200).json({ heroe, score: foundScore });
    } catch(err) {
        return res.status(500).json({ err: err.message });
    }
}

const show = (req, res) => {
    try {
        const heroeId = req.params.id;
        const scoreId = req.params.score_id;

        const heroe = heroesRepository.retrieve(heroeId);

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
    } catch(err) {
        return res.status(500).json({ err: err.message });
    }
}

const update = (req, res) => {
    try {
        const heroeId = req.params.id;
        const scoreId = req.params.score_id;

        const body = req.body;

        const heroe = heroesRepository.retrieve(heroeId);

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
    } catch(err) {
        return res.status(500).json({ err: err.message });
    }
}

const destroy = (req, res) => {
    try {

    } catch(err) {
        return res.status(500).json({ err: err.message });
    }
    const heroeId = req.params.id;
    const scoreId = req.params.score_id;

    const heroe = heroesRepository.retrieve(heroeId);

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
}

module.exports = {
    index,
    store,
    show,
    update,
    destroy
}
