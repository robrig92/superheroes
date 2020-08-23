"use strict";
const _ = require('lodash');
const Heroe = require('../models').Heroe;
const User = require('../models').User;
const Power = require('../models').Power;
const HeroeScore = require('../models').HeroeScore;
const UploadedFileHelper = require('../helpers/uploaded-file-helper');

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
                let power = await Power.findByPk(powerId);

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
    }
}
