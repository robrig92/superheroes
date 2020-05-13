"use strict";
const express = require('express');
const router = express.Router();
const heroes = require('./heroes');
const powers = require('./powers');
const users = require('./users');
const auth = require('./auth');

router.use(heroes);
router.use(powers);
router.use(users);
router.use(auth);

module.exports = router;