"use strict"

const Joi = require('@hapi/joi');

const Heroe = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().integer().required(),
    powers: Joi.array().items(Joi.number().integer()).required()
});

module.exports = Heroe;
