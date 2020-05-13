"use strict";
const User = require('../models').User;
const bcrypt = require('bcrypt');

const index = (req, res) => {
    const filter = {
        active: true
    };

    User.findAll({ where: filter })
        .then((users) => {
            res.json({
                data: {
                    users
                }
            });
        })
        .catch((err) => {
            res.status(500).json({ err });
        })
}

const store = (req, res) => {
    let body = req.body;
    let args = {
        name: body.name,
        email: body.email,
        username: body.username,
        password: bcrypt.hashSync(body.password, 10)
    };

    User.create(args)
        .then((user) => {
            res.status(201)
                .json({
                    data: {
                        user
                    }
                });
        })
        .catch((err) => {
            res.status(500).json({ err })
        })
}

const show = (req, res) => {
    let id = req.params.id;

    getUser(id, (err, user) => {
        if (err) {
            return res.status(500).json({err});
        }

        if (!user) {
            return res.status(404).json({
                message: 'Resource not found'
            });
        }

        res.json({
            data: {
                user
            }
        });
    });
}

const update = (req, res) => {
    let id = req.params.id;
    let body = req.body;
    let password = req.body.password || undefined;

    if (password) {
        password = bcrypt.hashSync(password, 10);
    }

    getUser(id, (err, user) => {
        if (err) {
            return res.status(500).json({ err });
        }

        if (!user) {
            return res.status(404).json({
                message: 'Resource not found'
            });
        }

        user.name = body.name || user.name;
        user.email = body.email || user.email;
        user.password = password || user.password;

        user.save()
            .then((user) => {
                res.json({
                    data: {
                        user
                    }
                });
            })
            .catch((err) => {
                res.status(500).json({ err });
            })
    });
}

const destroy = (req, res) => {
    let id = req.params.id;

    getUser(id, (err, user) => {
        if (err) {
            res.status(500).json({ err });
        }

        if (!user) {
            res.status(404).json({
                'message': 'Resource not found'
            });
        }

        user.active = false;

        user.save()
            .then((user) => {
                res.json({
                    data: {
                        user
                    }
                });
            })
            .catch((err) => {
                res.status(500).json({ err });
            });
    });
}

const getUser = (id, callback) => {
    User.findByPk(id)
        .then((user) => {
            callback(null, user);
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