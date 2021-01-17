"use strict";
const _ = require('lodash');
const Heroe = require('../models').Heroe;
const User = require('../models').User;
const HeroeScore = require('../models').HeroeScore;
const HeroePower = require('../models').HeroePower;
const UploadedFileHelper = require('../helpers/uploaded-file-helper');

const powersRepository = require('../repositories/powers');

const uploadsDir = 'server/storage/uploads';

module.exports = {
    async getAll() {
        try {
            return await Heroe.findAll({
                include: ['powers', {
                    model: HeroeScore,
                    as: 'scores',
                    include: [{
                        model: User,
                        as: 'user',
                        attributes: ['name']
                    }]
                }],
                order: [
                    ['id', 'DESC']
                ]
            });
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

                await heroe.addPowers(power);
            } catch (err) {
                console.log(err.message);
            }
        }
    },
    async store({ heroeBody, powers, file }) {
        try {
            const heroe = await Heroe.create(heroeBody);

            await this.attachPowers(heroe, powers);

            if (file) {
                const relativePath = `${uploadsDir}/${heroe.id}/${file.name}`;
                heroe.filePath = await UploadedFileHelper.upload(relativePath, file);
                await heroe.save();
            }

            return await Heroe.findByPk(heroe.id);
        } catch(error) {
            throw error;
        }
    },
    async find(id) {
        try {
            return await Heroe.findByPk(id, {
                include: ["powers", "scores"]
            });
        } catch(error) {
            throw error;
        }
    },
    async update(heroe, args) {
        const { heroeBody, powers, file } = args;

        heroe.name = heroeBody.name || heroe.name;
        heroe.age = heroeBody.age || heroe.age;

        try {
            if (powers.length > 0) {
                try {
                    await HeroePower.destroy({
                        where: {
                            heroe_id: heroe.id
                        }
                    });

                    await this.attachPowers(heroe, powers);
                } catch (err) {
                    throw err;
                }
            }

            if (file) {
                if (heroe.filePath) {
                    await UploadedFileHelper.destroy(heroe.filePath);
                }

                const relativePath = `${uploadsDir}/${heroe.id}/${file.name}`;
                heroe.filePath = await UploadedFileHelper.upload(relativePath, file);
            }

            await heroe.save();

            return heroe.reload();
        } catch(error) {
            throw error;
        }
    },
    async destroy(heroe) {
        try {
            await HeroePower.destroy({
                where: {
                    heroe_id: heroe.id
                }
            });
            await heroe.destroy();
        } catch (error) {
            throw error;
        }
    }
}
