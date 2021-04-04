"use strict";
const _ = require('lodash');
const HeroePower = require('../models').HeroePower;
const UploadedFileHelper = require('../helpers/uploaded-file-helper');

const powersRepository = require('../repositories/powers');
const heroesRepository = require('../repositories/heroes');

const uploadsDir = 'server/storage/uploads';

module.exports = {
    async getAll() {
        try {
            return await heroesRepository.findAll();
        } catch(error) {
            throw error;
        }
    },

    async attachPowers(heroe, powerIds) {
        const powersToAttach = _.isArray(powerIds) ? powerIds : [powerIds];

        for (const powerId of powersToAttach) {
            try {
                let power = await powersRepository.retrieve(powerId);

                if (!power) {
                    continue;
                }

                await heroesRepository.addPower(heroe, power);
            } catch (err) {
                console.log(err.message);
            }
        }
    },

    async store({ heroeBody, powers, file }) {
        const heroe = await heroesRepository.store(heroeBody);

        await this.attachPowers(heroe, powers);

        if (file) {
            const relativePath = `${uploadsDir}/${heroe.id}/${file.name}`;
            heroe.filePath = await UploadedFileHelper.upload(relativePath, file);
            await heroesRepository.update(heroe);
        }

        return heroe;
    },

    async find(id) {
        return await heroesRepository.retrieve(id);
    },

    async update(heroe, args) {
        const { heroeBody, powers, file } = args;

        heroe.name = heroeBody.name || heroe.name;
        heroe.age = heroeBody.age || heroe.age;

        if (powers.length > 0) {
            await HeroePower.destroy({
                where: {
                    heroe_id: heroe.id
                }
            });

            await this.attachPowers(heroe, powers);
        }

        if (file) {
            if (heroe.filePath) {
                await UploadedFileHelper.destroy(heroe.filePath);
            }

            const relativePath = `${uploadsDir}/${heroe.id}/${file.name}`;
            heroe.filePath = await UploadedFileHelper.upload(relativePath, file);
        }

        return heroesRepository.update(heroe);
    },

    async destroy(heroe) {
        await HeroePower.destroy({
            where: {
                heroe_id: heroe.id
            }
        });

        heroesRepository.destroy(heroe);
    },

    async getScores(heroe) {
        return await heroe.getScores({ include: 'user' });
    }
}
