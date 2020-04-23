"user strict";
const express = require('express');
const router = express.Router();
const powersController = require('../controllers/powers');

router.get('/powers', powersController.index);
router.post('/powers', powersController.store);
router.get('/powers/:id', powersController.show);
router.put('/powers/:id', powersController.update);
router.delete('/powers/:id', powersController.destroy);

module.exports = router;