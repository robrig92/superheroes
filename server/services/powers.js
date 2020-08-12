'use strict'
const Power = require('../models').Power;

module.exports = {
    async findAll() {
        try {
            return await Power.findAll();
        } catch(error) {
            throw error;
        }
    },
    async store(power) {
        try {
            return await Power.create(power);
        } catch(error) {
            throw error;
        }
    },
    async retrieve(id) {
        try {
            return await Power.findByPk(id);
        } catch(error) {
            throw error;
        }
    },
    async update(power, args) {
        try {
            power.name = args.name;
            return await power.save();
        } catch(error) {
            throw error;
        }
    },
    async destroy(power) {
        try {
            return await power.destroy();
        } catch(error) {
            throw error;
        }
    }
}
