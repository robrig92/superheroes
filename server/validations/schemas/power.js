"use strict"

const Joi = require('@hapi/joi')

const Power = Joi.object({
    name: Joi.string().required()
})

module.exports = Power;
