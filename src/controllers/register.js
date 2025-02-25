const bcrypt = require('bcrypt');
const userModel = require('../models/users');
const employeeModel = require('../models/employees');
const RegisterValidator = require('../validators/register/index');

const getRegisterHandler = async (req, res) => {
  const employees = await employeeModel.getAllEmployeeIdNames();
  res.render('register', {
    layout: 'layouts/login-layout',
    title: 'Register | Class Support App',
    employees,
    msg: req.flash('msg'),
    errorMsg: '',
    payload: {},
  });
};

const postRegisterHandler = async (req, res) => {
  const employees = await employeeModel.getAllEmployeeIdNames();
  try {
    RegisterValidator.validateRegisterUserPayload(req.body);
    const { username, password, empId } = req.body;
    await userModel.checkUserDuplicate(empId);
    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.addUser({ username, password: hashedPassword, empId });
    req.flash('msg', 'User has been added');
    res.redirect('/register');
  } catch (error) {
    console.log(error);
    res.render('register', {
      layout: 'layouts/login-layout',
      title: 'Register | Class Support App',
      employees,
      msg: req.flash('msg'),
      errorMsg: error.message,
      payload: req.body,
    });
  }
};

module.exports = { getRegisterHandler, postRegisterHandler };
