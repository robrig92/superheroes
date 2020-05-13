"use strict";
const User = require('../models').User;

const index = (req, res) => {
    User.findAll()
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
        password: body.password
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

    getUser(id, (err, user) => {
        if (err) {
            return res.status(500).json({err});
        }

        if (!user) {
            return res.status(404).json({
                message: 'Resource not found'
            });
        }

        user.name = body.name || user.name;
        user.email = body.email || user.email;
        user.password = body.password || user.password;

        user.save()
            .then((user) => {
                res.json({
                    data: {
                        user
                    }
                });
            })
            .catch((err) => {
                res.status(500).json({err});
            })
    });
}

const getUser = (id, callback) => {
    User.findByPk(id)
        .then((user) => {
            callback(null, user);
        })
        .catch((err) => {
            callback(err);
        });
}

module.exports = {
    index,
    store,
    show,
    update
}