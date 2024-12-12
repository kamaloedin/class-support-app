const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login');
const passport = require('passport');

router.get('/', loginController.getLoginHandler);

router.post(
  '/',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  }),
);

module.exports = router;
