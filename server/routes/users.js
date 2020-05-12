"user strict";
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

router.get('/users', usersController.index);
router.post('/users', usersController.store);
router.get('/users/:id', usersController.show);
router.put('/users/:id', usersController.update);

module.exports = router;