const pool = require('../config/database');

const getAllClassStudents = async (classId) => {
  const query = 'SELECT id, name FROM students WHERE class_id = ?';
  const [students] = await pool.query(query, [classId]);

  return students;
};

module.exports = { getAllClassStudents };
