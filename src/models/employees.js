const pool = require('../config/database');

const getAllEmployeeIdNames = async () => {
  const query = 'SELECT id, name FROM employees';
  const [employees] = await pool.query(query);
  return employees;
};

const getEmployeeNameById = async (id) => {
  const query = 'SELECT name FROM employees WHERE id = ?';
  const [employees] = await pool.query(query, [id]);
  return employees[0].name;
};

module.exports = { getEmployeeNameById, getAllEmployeeIdNames };
