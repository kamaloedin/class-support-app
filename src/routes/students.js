const express = require('express');
const router = express.Router();
const studentController = require('../controllers/students');

router.get('/add-student-form', studentController.getStudentFormHandler);

router.get('/:studentId', studentController.getStudentDetailsHandler);

router.post('/', studentController.postStudentHandler);

module.exports = router;
