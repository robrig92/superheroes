"use strict";
const UsersService = require('../services/users');

const index = (req, res) => {
    try {
        const users = UsersService.activeUsers();

        return res.json({ users });
    } catch(error) {
        return res.status(500).json({ error: error.message });
    }
}

const store = (req, res) => {
    let body = req.body;

    try {
        const user = UsersService.create(body);

        return res.json({ user });
    } catch(error) {
        return res.status(500).json({ error: error.message });
    }
}

const show = (req, res) => {
    let id = req.params.id;

    try {
        const user = UserRepository.get(id);

        if (!user) {
            return res.status(404).json({
                message: 'Resource not found'
            });
        }

        return res.json({
            data: {
                user
            }
        });

    } catch(error) {
        return res.status(500).json({ error: error.message });
    }
}

const update = async (req, res) => {
    let id = req.params.id;
    let body = req.body;

    try {
        const user = UsersService.get(id);

        if (!user) {
            return res.status(404).json({
                message: 'Resource not found'
            });
        }

        const updatedUser = await UsersService.update(user, body);

        return res.json({ user: updatedUser });
    } catch(error) {
        return res.status(500).json({ error: error.message });
    }
}

const destroy = async (req, res) => {
    let id = req.params.id;

    try {
        const user = await UserService.get(id);

        if (!user) {
            res.status(404).json({
                'message': 'Resource not found'
            });
        }

        const updatedUser = await UserRepository.destroy(user);

        return res.json({ user: updatedUser });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    index,
    store,
    show,
    update,
    destroy
}
