const getLogoutHandler = (req, res) => {
  req.logOut();
  res.redirect('/login');
};

module.exports = { getLogoutHandler };
