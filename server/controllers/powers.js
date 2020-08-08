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

const store = (req, res) => {
    let body = req.body;
    let args = {
        name: body.name
    };

    Power.create(args)
        .then((power) => {
            res.status(201).json({
                data: {
                    power
                }
            });
        })
        .catch((err) => {
            res.status(500).json({ err });
        });
}

const show = (req, res) => {
    let id = req.params.id;

    getPower(id, (err, power) => {
        if (err) {
            return res.status(500).json({ err });
        }

        if (!power) {
            return res.status(404).json({
                message: 'Resource not found'
            });
        }

        res.json({
            data: {
                power
            }
        });
    });
}

const update = (req, res) => {
    let id = req.params.id;
    let body = req.body;

    getPower(id, (err, power) => {
        if (err) {
            return res.status(500).json({ err });
        }

        if (!power) {
            return res.status(404).json({
                message: 'Resource not found'
            });
        }

        power.name = body.name;
        power.save()
            .then((power) => {
                res.json({
                    data: {
                        power
                    }
                });
            })
            .catch((err) => {
                res.status(500).json({
                    err
                });
            });
    });
}

const destroy = (req, res) => {
    let id = req.params.id;

    getPower(id, (err, power) => {
        if (err) {
            return res.status(500).json({ err });
        }

        if (!power) {
            return res.status(404).json({
                message: 'Resource not found',
            });
        }

        power.destroy()
            .then(() => {
                res.json({
                    message: 'Deleted',
                    data: {
                        power
                    }
                });
            })
            .catch((err) => {
                res.status(500).json({ err });
            });
    });
}

const getPower = (id, callback) => {
    Power.findByPk(id)
        .then((power) => {
            callback(null, power);
        })
        .catch((err) => {
            callback(err);
        });
}

module.exports = {
    index,
    store,
    show,
    update,
    destroy
}
