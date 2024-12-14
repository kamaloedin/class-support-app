const employeeModel = require('../models/employees');

const getIndexHandler = async (req, res) => {
  const empName = await employeeModel.getEmployeeNameById(req.user.employee_id);
  res.render('index', {
    layout: 'layouts/main-layout',
    title: 'Class Support App | Home',
    empName,
  });
};

module.exports = { getIndexHandler };
