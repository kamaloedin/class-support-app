const express = require('express');
const router = express.Router();
const studentController = require('../controllers/students');
const authMiddleware = require('../middlewares/auth');
const upload = require('../middlewares/multer');
const { phoneChecks } = require('../middlewares/express-validator');

router.get('/', authMiddleware.checkAuthenticated, studentController.getStudentsHandler);

router.get(
  '/add-student-form',
  authMiddleware.checkAuthenticated,
  studentController.getAddStudentFormHandler,
);

router.post(
  '/',
  upload.single('img_file'),
  authMiddleware.checkAuthenticated,
  phoneChecks,
  studentController.postStudentHandler,
);

router.get(
  '/edit-student-form/:studentId',
  authMiddleware.checkAuthenticated,
  studentController.getEditStudentFormHandler,
);

router.put(
  '/',
  upload.single('img_file'),
  authMiddleware.checkAuthenticated,
  phoneChecks,
  studentController.putStudentHandler,
);

router.get(
  '/:studentId',
  authMiddleware.checkAuthenticated,
  studentController.getStudentDetailsHandler,
);

router.delete('/', authMiddleware.checkAuthenticated, studentController.deleteStudentHandler);

module.exports = router;
