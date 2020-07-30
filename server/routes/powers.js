"user strict";
const express = require('express');
const router = express.Router();
const powersController = require('../controllers/powers');
const validateJwt = require('../middlewares/jwt').validateJwt;
const validatePower = require('../validations/powers');
const validateAdmin = require('../middlewares/admin').validateAdmin;

router.use('/powers', validateJwt, validateAdmin);
router.get('/powers', powersController.index);
router.post('/powers', validatePower, powersController.store);
router.get('/powers/:id', powersController.show);
router.put('/powers/:id', validatePower, powersController.update);
router.delete('/powers/:id', powersController.destroy);

module.exports = router;
