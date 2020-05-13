"user strict";
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.post('/auth/login', authController.logIn);

module.exports = router;