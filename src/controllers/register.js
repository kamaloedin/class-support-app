const bcrypt = require('bcrypt');
const userModel = require('../models/users');
const employeeModel = require('../models/employees');
const { validationResult } = require('express-validator');

const getRegisterHandler = async (req, res) => {
  const employees = await employeeModel.getAllEmployeeIdNames();
  res.render('register', {
    layout: 'layouts/login-layout',
    title: 'Register | Class Support App',
    employees,
  });
};

const postRegisterHandler = async (req, res) => {
  const { username, password, empId } = req.body;
  const validationErrors = validationResult(req);

  if (validationErrors.isEmpty()) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await userModel.addUser({ username, password: hashedPassword, empId });

      res.redirect('/login');
    } catch (e) {
      console.log(e);
      res.redirect('/register');
    }
  } else {
    res.render('register', {
      layout: 'layouts/login-layout',
      title: 'Register | Class Support App',
      employees,
      validationErrors: validationErrors.array(),
    });
  }
};

module.exports = { getRegisterHandler, postRegisterHandler };
