const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const registerController = require('../controllers/register');

router.get('/', authMiddleware.checkNotAuthenticated, registerController.getRegisterHandler);

router.post('/', authMiddleware.checkNotAuthenticated, registerController.postRegisterHandler);

module.exports = router;
