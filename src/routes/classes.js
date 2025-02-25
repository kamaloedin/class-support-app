const express = require('express');
const router = express.Router();
const classController = require('../controllers/classes');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware.checkAuthenticated, classController.getAllClassesHandler);

router.get('/:classId', authMiddleware.checkAuthenticated, classController.getClassDetailsHandler);

module.exports = router;
