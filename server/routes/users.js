"user strict";
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const validateJwt = require('../middlewares/jwt').validateJwt;

router.get('/users', validateJwt, usersController.index);
router.post('/users', usersController.store);
router.get('/users/:id', validateJwt, usersController.show);
router.put('/users/:id', validateJwt, usersController.update);
router.delete('/users/:id', validateJwt, usersController.destroy);

module.exports = router;