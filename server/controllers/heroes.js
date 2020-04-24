"use strict";
const Heroe = require('../models').Heroe;
const Power = require('../models').Power;
const HeroePower = require('../models').HeroePower;

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

const store = (req, res) => {
    let body = req.body;
    let powers = body.powers || [];
    let args = {
        name: body.name,
        age: body.age,
    };

    Heroe.create(args)
        .then(async(heroe) => {
            if (!heroe) {
                return;
            }

            await attachPowers(heroe, powers);

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

        getHeroe(heroe.id, (err, heroe) => {
            return res.json({
                data: {
                    heroe
                }
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