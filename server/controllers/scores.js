"use strict"

const Heroe = require('../models').Heroe;
const Score = require('../models').HeroeScore;

const store = (req, res) => {
    const id = req.params.id;
    const { score, comment } = req.body;

    Heroe.findByPk(id)
        .then((heroe) => {
            if (!heroe) {
                return res.status(404).json({
                    message: "Resource not found"
                });
            }


        });
}

module.exports = {
    store
}
