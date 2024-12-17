const employeeModel = require('../models/employees');

const getIndexHandler = async (req, res) => {
  const empName = await employeeModel.getEmployeeNameById(req.user.employee_id);
  const roleId = req.user.role_id;
  res.render('index', {
    layout: 'layouts/main-layout',
    title: 'Home | Class Support App',
    empName,
    roleId,
  });
};

module.exports = { getIndexHandler };
