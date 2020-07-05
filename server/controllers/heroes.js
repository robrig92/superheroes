"use strict";
const fs = require('fs');
const path = require('path');
var appRoot = require('app-root-path');
const Heroe = require('../models').Heroe;
const Power = require('../models').Power;
const HeroePower = require('../models').HeroePower;

const uploadsDir = 'server/storage/uploads';

const index = (req, res) => {
    Heroe.findAll({
            include: ['powers'],
            order: [
                ['id', 'DESC']
            ]
        })
        .then((heroes) => {
            res.json({ data: { heroes } });
        })
        .catch((err) => {
            res.status(500).json({ err: err.message });
        });
}

const uploadFile = async (heroe, file) => {
    const relativePath = `${uploadsDir}/${heroe.id}/${file.name}`;
    const uploadsPath = path.join(appRoot.path, uploadsDir, `${heroe.id}`, file.name);
    await file.mv(uploadsPath);

    return relativePath;
}

const deleteFile = async (filePath) => {
    fs.unlinkSync(filePath);
}

const store = (req, res) => {
    let body = req.body;
    let powers = body.powers || [];
    let args = {
        name: body.name,
        age: body.age,
    };
    let file = req.files ? req.files.photo : undefined;

    Heroe.create(args)
        .then(async(heroe) => {
            if (!heroe) {
                return;
            }

            await attachPowers(heroe, powers);

            if (file) {
                heroe.filePath = await uploadFile(heroe, file);
                await heroe.save();
            }

            getHeroe(heroe.id, (err, heroe) => {
                res.json({
                    data: {
                        heroe
                    }
                });
            });
        }, {
            include: ['powers']
        })
        .catch((err) => {
            res.status(500).json({ err: err.message });
        });
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
                await deleteFile(heroe.filePath);
            }

            heroe.filePath = await uploadFile(heroe, file);
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
    for (const powerId of powerIds) {
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

const getHeroe = (id, callback) => {
    Heroe.findByPk(id, {
            include: ['powers']
        })
        .then((heroe) => {
            callback(null, heroe);
        })
        .catch((err) => {
            callback(err.message);
        });
}

module.exports = {
    index,
    store,
    show,
    update,
    destroy
}