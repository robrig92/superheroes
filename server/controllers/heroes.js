"use strict";

const index = (req, res) => {
    res.json({
        message: 'A lot of data found'
    });
}

module.exports = {
    index
}