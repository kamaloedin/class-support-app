const getLogoutHandler = async (req, res) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
  });
  res.redirect('/login');
};

module.exports = { getLogoutHandler };
