"use strict";
const UserRepository = require('../models').User;
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const logIn = async (req, res) => {
    let { username, password } = req.body;

    const user = await auth(username, password);

    if (!user) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }

    const jwt = jsonwebtoken.sign({
        user
    }, 'secret', { expiresIn: '1m' });

    res.json({
        data: {
            jwt,
            user
        }
    });
}

const auth = async (username, password) => {
    if (!username || !password) {
        return null;
    }

    try {
        const user = await UserRepository.findOne({
            where: {
                username: username
            }
        });

        if (!user) {
            return null;
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return null;
        }

        if (!user.active) {
            return null;
        }

        return user;
    } catch(err) {
        console.log(err);
        return false;
    }
}

module.exports = {
    logIn,
    signUp
}