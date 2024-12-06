const express = require('express');
const router = express.Router();
const studentController = require('../controllers/students');

router.get('/:studentId', studentController.getStudentDetailsHandler);

module.exports = router;
