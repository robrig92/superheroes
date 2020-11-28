'use strict';

const bcrypt = require('bcrypt');

const hash = (target) => {
    return bcrypt.hashSync(target, 10);
}

const compare = (incoming, hash) => {
    return bcrypt.compareSync(incoming, hash);
}

module.exports = {
    hash,
    compare
};
