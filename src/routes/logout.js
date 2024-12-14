const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const logoutController = require('../controllers/logout');

router.delete('/', authMiddleware.checkAuthenticated, logoutController.getLogoutHandler);

module.exports = router;
