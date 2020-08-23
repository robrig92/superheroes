"use strict";

const User = require('../models').User;
const HeroeScore = require('../models').HeroeScore;
const Heroe = require('../models').Heroe;
const Power = require('../models').Power;
const HeroePower = require('../models').HeroePower;
const UploadedFileHelper = require('../helpers/uploaded-file-helper');
const _ = require('lodash')
const HeroesService = require('../services/heroes');

const uploadsDir = 'server/storage/uploads';

const getHeroe = (id, callback) => {
    Heroe.findByPk(id, {
            include: ['powers', 'scores']
        })
        .then((heroe) => {
            callback(null, heroe);
        })
        .catch((err) => {
            callback(err.message);
        });
}

const index = async (req, res) => {
    try {
        const heroes = await HeroesService.getAll();

        return res.json({ data: { heroes } });
    } catch(err) {
        return res.status(500).json({ err: err.message });
    }
}

const store = async (req, res) => {
    let body = req.body;
    let powers = body.powers || [];
    let args = {
        name: body.name,
        age: body.age,
    };
    let file = req.files ? req.files.photo : undefined;

    if (typeof powers === 'string') {
        powers = powers.split(',');
    }

    try {
        const heroe = await HeroesService.store({
            heroeBody: args,
            powers,
            file
        });

        return res.json({
            data: {
                heroe
            }
        });
    } catch(err) {
        return res.status(500).json({ err: err.message });
    }
}

const show = (req, res) => {
    let id = req.params.id;

    getHeroe(id, (err, heroe) => {
        if (err) {
            return res.status(500).json({
                err
            });
        }

        if (!heroe) {
            return res.status(404).json({
                message: 'Resource not found'
            });
        }

        res.json({
            data: {
                heroe
            }
        });
    });
};

const update = (req, res) => {
    let id = req.params.id;
    let body = req.body;
    let powers = body.powers || [];
    const file = req.files ? req.files.photo : undefined;

    if (typeof powers === 'string') {
        powers = JSON.parse(powers);
    }

    getHeroe(id, async(err, heroe) => {
        if (err) {
            return res.status(500).json({
                err
            });
        }

        if (!heroe) {
            return res.status(404).json({
                message: 'Resource not found'
            });
        }

        heroe.name = body.name || heroe.name;
        heroe.age = body.age || heroe.age;

        if (powers.length > 0) {
            try {
                await HeroePower.destroy({
                    where: {
                        heroe_id: heroe.id
                    }
                });

                await attachPowers(heroe, powers);
            } catch (err) {
                console.log(err.message);
            }
        }

        if (file) {
            if (heroe.filePath) {
                await UploadedFileHelper.destroy(heroe.filePath);
            }

            const relativePath = `${uploadsDir}/${heroe.id}/${file.name}`;
            heroe.filePath = await UploadedFileHelper.upload(relativePath, file);
        }

        heroe.save()
            .then((power) => {
                return res.json({
                    data: {
                        heroe
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

    getHeroe(id, (err, heroe) => {
        if (err) {
            return res.status(500).json({
                err
            });
        }

        if (!heroe) {
            return res.status(404).json({
                message: 'Resource not found'
            });
        }

        HeroePower.destroy({
                where: {
                    heroe_id: heroe.id
                }
            })
            .then(() => {
                heroe.destroy()
                    .then(() => {
                        res.json({
                            message: 'deleted',
                            heroe
                        });
                    })
                    .catch((err) => {
                        res.status(500).json({ err: err.message });
                    });
            })
            .catch((err) => {
                res.status(500).json({
                    err: err.message
                });
            });
    });
}

const attachPowers = async(heroe, powerIds) => {
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
}

module.exports = {
    index,
    store,
    show,
    update,
    destroy
}
