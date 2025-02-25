const passport = require('passport');

const getLoginHandler = (req, res) => {
  res.render('login', { layout: 'layouts/login-layout', title: 'Login | Home' });
};

const postLoginHandler = () =>
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  });

module.exports = { getLoginHandler, postLoginHandler };
