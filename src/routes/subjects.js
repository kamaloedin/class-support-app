const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjects');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware.checkAuthenticated, subjectController.getAllSubjectsHandler);

router.get(
  '/add-subject-form',
  authMiddleware.checkAuthenticated,
  subjectController.getAddSubjectFormHandler,
);

router.post('/', authMiddleware.checkAuthenticated, subjectController.postSubjectHandler);

router.delete('/', authMiddleware.checkAuthenticated, subjectController.deleteSubjectHandler);

module.exports = router;
