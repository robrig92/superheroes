"user strict";
const express = require('express');
const router = express.Router();
const powersController = require('../controllers/powers');
const validateJwt = require('../middlewares/jwt').validateJwt;

router.use('/powers', validateJwt);
router.get('/powers', powersController.index);
router.post('/powers', powersController.store);
router.get('/powers/:id', powersController.show);
router.put('/powers/:id', powersController.update);
router.delete('/powers/:id', powersController.destroy);

module.exports = router;