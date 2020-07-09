"use strict"

const HeroeSchema = require('./schemas/heroes');

const validateHeroe = (req, res, next) => {
    const { error, value } = HeroeSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errors = error.details.map(error => ({'field': error.path, 'message': error.message}))

        return res.status(500).json({
            err: errors
        });
    }

    next();
}

module.exports = validateHeroe;
