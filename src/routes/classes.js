const express = require('express');
const router = express.Router();
const classController = require('../controllers/classes');

router.get('/', classController.getAllClassesHandler);

module.exports = router;
