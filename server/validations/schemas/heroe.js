"use strict"

const Joi = require('@hapi/joi');

const Heroe = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().integer().required(),
    powers: Joi.any().required()
});

module.exports = Heroe;
