"use strict";

const _ = require('lodash')
const heroesService = require('../services/heroes');
const httpResponse = require('../utils/http-response');

const index = async (req, res) => {
    try {
        const heroes = await heroesService.getAll();

        return httpResponse.ok(res)('', { heroes });
    } catch(err) {
        return httpResponse.error(res)('', { err: err.message });
    }
}

const store = async (req, res) => {
    let body = req.body;
    let powers = body.powers || [];
    let args = {
        name: body.name,
        age: body.age,
    };
    let file = req.files ? req.files.photo : undefined;

    if (typeof powers === 'string') {
        powers = powers.split(',');
    }

    try {
        const heroe = await heroesService.store({
            heroeBody: args,
            powers,
            file
        });

        return httpResponse.ok(res)('', { data: { heroe } });
    } catch(err) {
        return httpResponse.error(res)({ err: err.message });
    }
}

const show = async (req, res) => {
    let id = req.params.id;

    try {
        const heroe = await heroesService.find(id);

        if (!heroe) {
            return res.status(404).json({
                message: 'Resource not found'
            });
        }

        return httpResponse.ok(res)('', { heroe });
    } catch(err) {
        return httpResponse.error(res)('', { err: err.message });
    }
};

const update = async (req, res) => {
    let id = req.params.id;
    let body = req.body;
    let powers = body.powers || [];
    const file = req.files ? req.files.photo : undefined;

    if (typeof powers === 'string') {
        powers = JSON.parse(powers);
    }

    try {
        const heroe = await heroesService.find(id);

        if (!heroe) {
            return httpResponse.notFound(res)();
        }

        const updatedHeroe = await heroesService.update(heroe, {
            heroeBody: body,
            powers,
            file
        })

        return httpResponse.ok(res)('', { heroe: updatedHeroe });
    } catch (err) {
        return httpResponse.error(res)('', { err: err.message });
    }
}

const destroy = async (req, res) => {
    let id = req.params.id;

    try {
        const heroe = await heroesService.find(id);

        if (!heroe) {
            return res.status(404).json({
                message: 'Resource not found'
            });
        }

        await heroesService.destroy(heroe);

        return httpResponse.ok(res)('Deleted', { heroe });
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
