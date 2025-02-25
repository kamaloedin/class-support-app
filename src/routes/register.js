const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const registerController = require('../controllers/register');

router.get('/', authMiddleware.checkAuthenticated, registerController.getRegisterHandler);

router.post('/', authMiddleware.checkAuthenticated, registerController.postRegisterHandler);

module.exports = router;
