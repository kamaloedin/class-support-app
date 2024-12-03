const pool = require('../config/database');

const getAllClasses = async () => {
  const query = 'SELECT * FROM classes';
  const classes = await pool.execute(query);

  return classes;
};

module.exports = { getAllClasses };
