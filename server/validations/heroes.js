"use strict"

const HeroeSchema = require('./schemas/heroe');

const validate = (req, res, next) => {
    const { error, value } = HeroeSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errors = error.details.map(error => ({'field': error.path, 'message': error.message}));

        return res.status(422).json({
            err: errors
        });
    }

    next();
}

module.exports = validate;
