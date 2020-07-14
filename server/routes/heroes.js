"user strict";
const express = require('express');
const router = express.Router();
const heroesController = require('../controllers/heroes');
const scoresController = require('../controllers/scores');
const validateJwt = require('../middlewares/jwt').validateJwt;
const validateHeroe = require('../validations/heroes');
const validateScore = require('../validations/heroe-scores');

router.get('/heroes', heroesController.index);
router.post('/heroes', validateJwt, validateHeroe, heroesController.store);
router.get('/heroes/:id', validateJwt, heroesController.show);
router.put('/heroes/:id', validateJwt, validateHeroe, heroesController.update);
router.delete('/heroes/:id', validateJwt, heroesController.destroy);

// Scores
router.get('/heroes/:id/scores', validateJwt, scoresController.index);
router.post('/heroes/:id/scores', validateJwt, validateScore, scoresController.store);
router.get('/heroes/:id/scores/:score_id', validateJwt, scoresController.show);
router.put('/heroes/:id/scores/:score_id', validateJwt, validateScore, scoresController.update);
router.delete('/heroes/:id/scores/:score_id', validateJwt, scoresController.destroy);

module.exports = router;
