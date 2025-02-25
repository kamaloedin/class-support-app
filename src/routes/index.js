const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const indexController = require('../controllers/index');

router.get('/', authMiddleware.checkAuthenticated, indexController.getIndexHandler);

module.exports = router;
