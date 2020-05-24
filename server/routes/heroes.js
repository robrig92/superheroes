"user strict";
const express = require('express');
const router = express.Router();
const heroesController = require('../controllers/heroes');
const validateJwt = require('../middlewares/jwt').validateJwt;

router.use('/heroes', validateJwt);
router.get('/heroes', heroesController.index);
router.post('/heroes', heroesController.store);
router.get('/heroes/:id', heroesController.show);
router.put('/heroes/:id', heroesController.update);
router.delete('/heroes/:id', heroesController.destroy);

module.exports = router;