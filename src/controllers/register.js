const bcrypt = require('bcrypt');
const userModel = require('../models/users');

const getRegisterHandler = (req, res) => {
  res.render('register', { layout: 'layouts/login-layout', title: 'Register | Home' });
};

const postRegisterHandler = async (req, res) => {
  const { username, password, empId } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.addUser({ username, password: hashedPassword, empId });

    res.redirect('/login');
  } catch (e) {
    console.log(e);
    res.redirect('/register');
  }
};

module.exports = { getRegisterHandler, postRegisterHandler };
