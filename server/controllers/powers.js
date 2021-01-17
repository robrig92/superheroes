"use strict";

const powersService = require('../services/powers');

const index = async (req, res) => {
    try {
        const powers = await powersService.findAll();

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
        const power = await powersService.store(args);

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
        const power = await powersService.retrieve(id);

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
        let power = await powersService.retrieve(id);

        if (!power) {
            return res.status(404).json({
                message: 'Resource not found'
            });
        }

        power = await powersService.update(power, body);

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
        const power = await powersService.retrieve(id);

        if (!power) {
            return res.status(404).json({
                message: 'Resource not found',
            });
        }

        await powersService.destroy(power);

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
