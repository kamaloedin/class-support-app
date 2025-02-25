const pool = require('../config/database');

const getAllClasses = async () => {
  const query = 'SELECT * FROM classes';
  const [classes] = await pool.query(query);

  return classes;
};

const getClassName = async (classId) => {
  const query = 'SELECT name FROM classes WHERE id = ?';
  const [result] = await pool.query(query, [classId]);

  return result[0].name;
};

module.exports = { getAllClasses, getClassName };
