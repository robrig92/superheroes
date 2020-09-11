"use strict";

const _ = require('lodash')
const HeroesService = require('../services/heroes');

const index = async (req, res) => {
    try {
        const heroes = await HeroesService.getAll();

        return res.json({ data: { heroes } });
    } catch(err) {
        return res.status(500).json({ err: err.message });
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
        const heroe = await HeroesService.store({
            heroeBody: args,
            powers,
            file
        });

        return res.json({
            data: {
                heroe
            }
        });
    } catch(err) {
        return res.status(500).json({ err: err.message });
    }
}

const show = async (req, res) => {
    let id = req.params.id;

    try {
        const heroe = await HeroesService.find(id);

        if (!heroe) {
            return res.status(404).json({
                message: 'Resource not found'
            });
        }

        return res.json({
            data: {
                heroe
            }
        });
    } catch(err) {
        return res.status(500).json({ err: err.message });
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
        const heroe = await HeroesService.find(id);

        if (!heroe) {
            return res.status(404).json({
                message: 'Resource not found'
            });
        }

        const updatedHeroe = await HeroesService.update(heroe, {
            heroeBody: body,
            powers,
            file
        })

        return res.json({ data: { heroe: updatedHeroe } });
    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
}

const destroy = async (req, res) => {
    let id = req.params.id;

    try {
        const heroe = await HeroesService.find(id);

        if (!heroe) {
            return res.status(404).json({
                message: 'Resource not found'
            });
        }

        await HeroesService.destroy(heroe);

        return res.json({
            message: 'deleted',
            heroe
        });
    } catch(err) {
        return res.status(500).json({ err: err.message });
    }
}

module.exports = {
    index,
    store,
    show,
    update,
    destroy
}
