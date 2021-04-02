"use strict";

const powersService = require('../services/powers');
const httpResponse = require('../utils/http-response');

const index = async (req, res) => {
    try {
        const powers = await powersService.findAll();

        return httpResponse.ok(res)('', { powers });
    } catch(err) {
        return httpResponse.ok(res)('', { err: err.message });
    }
}

const store = async (req, res) => {
    let body = req.body;
    let args = {
        name: body.name
    };

    try {
        const power = await powersService.store(args);

        return httpResponse.created('', { power });
    } catch(err) {
        return httpResponse.error(res)('', { err: err.message });
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

        return httpResponse.ok(res)('', { power })
    } catch(err) {
        return httpResponse.error(res)('', { err: err.message });
    }
}

const update = async (req, res) => {
    let id = req.params.id;
    let body = req.body;

    try {
        let power = await powersService.retrieve(id);

        if (!power) {
            return httpResponse.notFound(res)();
        }

        power = await powersService.update(power, body);

        return httpResponse.ok(res)('', { power });
    } catch(err) {
        return httpResponse.error(res)({ err: err.message });
    }
}

const destroy = async (req, res) => {
    let id = req.params.id;

    try {
        const power = await powersService.retrieve(id);

        if (!power) {
            return httpResponse.notFound(res)();
        }

        await powersService.destroy(power);

        return httpResponse.ok(res)('Deleted', { power });
    } catch(err) {
        return httpResponse.error(res)({ err: err.message });
    }
}

module.exports = {
    index,
    store,
    show,
    update,
    destroy
}
