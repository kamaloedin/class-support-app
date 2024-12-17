const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const registerController = require('../controllers/register');
const { check } = require('express-validator');

router.get('/', authMiddleware.checkAuthenticated, registerController.getRegisterHandler);

router.post(
  '/',
  authMiddleware.checkAuthenticated,
  [
    check('empId').notEmpty().isString(),
    check('username', 'Username must have at least 6 characters and does not contain spaces')
      .isString()
      .isLength({ min: 6 })
      .trim(),
    check('password', 'Password must have at least 3 characters and does not contain spaces')
      .isString()
      .isStrongPassword({ minLength: 3 })
      .trim(),
  ],
  registerController.postRegisterHandler,
);

module.exports = router;
