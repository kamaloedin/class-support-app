const express = require('express');
const router = express.Router();
const classController = require('../controllers/classes');

router.get('/', classController.getAllClassesHandler);

router.get('/:classId', classController.getClassDetailsHandler);

module.exports = router;
