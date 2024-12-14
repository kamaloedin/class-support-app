const getLogoutHandler = async (req, res) => {
  await req.logOut();
  res.redirect('/login');
};

module.exports = { getLogoutHandler };
