"user strict";
const express = require('express');
const router = express.Router();
const heroesController = require('../controllers/heroes');

router.get('/heroes', heroesController.index);

module.exports = router;