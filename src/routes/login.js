const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const loginController = require('../controllers/login');
const passport = require('passport');

router.get('/', authMiddleware.checkNotAuthenticated, loginController.getLoginHandler);

router.post(
  '/',
  authMiddleware.checkNotAuthenticated,
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  }),
);

module.exports = router;
