"use strict";
const Power = require('../models').Power;
const PowersService = require('../services/powers');

const index = async (req, res) => {
    try {
        const powers = await PowersService.findAll();

        return res.json({
            data: {
                powers
            }
        });
    } catch(err) {
        return res.status(500).json({ err: err.message });
    }
}

const store = async (req, res) => {
    let body = req.body;
    let args = {
        name: body.name
    };

    try {
        const power = await PowersService.store(args);

        return res.status(201).json({
            data: {
                power
            }
        });
    } catch(err) {
        return res.status(500).json({ err: err.message })
    }
}

const show = async (req, res) => {
    let id = req.params.id;

    try {
        const power = await PowersService.retrieve(id);

        if (!power) {
            return res.status(404).json({
                message: 'Resource not found'
            });
        }

        return res.json({
            data: {
                power
            }
        });
    } catch(err) {
        return res.status(500).json({ err: err.message });
    }
}

const update = async (req, res) => {
    let id = req.params.id;
    let body = req.body;

    try {
        let power = await PowersService.retrieve(id);

        if (!power) {
            return res.status(404).json({
                message: 'Resource not found'
            });
        }

        power = await PowersService.update(power, body);

        return res.json({
            data: {
                power
            }
        });
    } catch(err) {
        return res.status(500).json({ err: err.message });
    }
}

const destroy = async (req, res) => {
    let id = req.params.id;

    try {
        const power = await PowersService.retrieve(id);

        if (!power) {
            return res.status(404).json({
                message: 'Resource not found',
            });
        }

        await PowersService.destroy(power);

        return res.json({
            message: 'Deleted',
            data: {
                power
            }
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
