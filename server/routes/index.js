"use strict";
const express = require('express');
const router = express.Router();
const heroes = require('./heroes');
const powers = require('./powers');

router.use(heroes);
router.use(powers);

module.exports = router;