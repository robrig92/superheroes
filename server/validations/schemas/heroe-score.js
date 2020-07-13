"use strcit"

const Joi = require('@hapi/joi');

const HeroeScore = Joi.object({
    score: Joi.number().required(),
    comment: Joi.string()
});

module.exports = HeroeScore;
