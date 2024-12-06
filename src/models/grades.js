const pool = require('../config/database');

const getAllGrades = async () => {
  const query = 'SELECT * FROM grades';
  const [grades] = await pool.query(query);

  return grades;
};

module.exports = { getAllGrades };
