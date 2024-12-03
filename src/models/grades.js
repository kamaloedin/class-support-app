const { pool } = require('../config/database');

const getAllGrades = async () => {
  const query = 'SELECT * FROM grades';
  const grades = pool.execute(query);

  return grades;
};

module.exports = { getAllGrades };
