"user strict";
const express = require('express');
const router = express.Router();
const heroesController = require('../controllers/heroes');
const validateJwt = require('../middlewares/jwt').validateJwt;
const validateHeroe = require('../validations/heroes');

router.use('/heroes', validateJwt);
router.get('/heroes', heroesController.index);
router.post('/heroes', validateHeroe, heroesController.store);
router.get('/heroes/:id', heroesController.show);
router.put('/heroes/:id', validateHeroe, heroesController.update);
router.delete('/heroes/:id', heroesController.destroy);

module.exports = router;
