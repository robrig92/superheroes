'use strict'
const Power = require('../models').Power;

module.exports = {
    async findAll() {
        try {
            return await Power.findAll();
        } catch(error) {
            throw error;
        }
    }
}
