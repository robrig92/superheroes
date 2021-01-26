"use strict";
const usersService = require('../services/users');

const index = async (req, res) => {
    try {
        const users = await usersService.activeUsers();

        return res.json({ data: { users } });
    } catch(error) {
        return res.status(500).json({ error: error.message });
    }
}

const store = async (req, res) => {
    let body = req.body;

    try {
        const user = await usersService.create(body);

        return res.json({ data: { user } });
    } catch(error) {
        return res.status(500).json({ error: error.message });
    }
}

const show = async (req, res) => {
    let id = req.params.id;

    try {
        const user = await usersService.get(id);

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
        const user = usersService.get(id);

        if (!user) {
            return res.status(404).json({
                message: 'Resource not found'
            });
        }

        const updatedUser = await usersService.update(user, body);

        return res.json({ user: updatedUser });
    } catch(error) {
        return res.status(500).json({ error: error.message });
    }
}

const destroy = async (req, res) => {
    let id = req.params.id;

    try {
        const user = await usersService.get(id);

        if (!user) {
            res.status(404).json({
                'message': 'Resource not found'
            });
        }

        const updatedUser = await usersService.destroy(user);

        return res.json({ data: { user: updatedUser } });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const storeAdmin = async (req, res) => {
    let body = req.body;

    try {
        const user = await usersService.createAdmin(body);

        return res.json({ data: { user } });
    } catch(error) {
        return res.status(500).json({ error: error.message });
    }
}


module.exports = {
    index,
    store,
    show,
    update,
    destroy,
    storeAdmin
}
