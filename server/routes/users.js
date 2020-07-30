"user strict";
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const validateJwt = require('../middlewares/jwt').validateJwt;
const validateAdmin = require('../middlewares/admin').validateAdmin;

router.get('/users', validateJwt, validateAdmin, usersController.index);
router.post('/users', usersController.store);
router.get('/users/:id', validateJwt, validateAdmin, usersController.show);
router.put('/users/:id', validateJwt, validateAdmin, usersController.update);
router.delete('/users/:id', validateJwt, validateAdmin, usersController.destroy);

module.exports = router;