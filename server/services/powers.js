'use strict'

const powersRepository = require('../repositories/powers');

module.exports = {
    async findAll() {
        return await powersRepository.findAll();
    },
    async store(power) {
        return await powersRepository.store(power);
    },
    async retrieve(id) {
        return await powersRepository.retrieve(id);
    },
    async update(power, args) {
        power.name = args.name;
        return await powersRepository.update(power);
    },
    async destroy(power) {
        return await powersRepository.destroy(power);
    }
}
