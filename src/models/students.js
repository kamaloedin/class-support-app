const pool = require('../config/database');

const getAllClassStudents = async (classId) => {
  const query = 'SELECT id, name FROM students WHERE class_id = ?';
  const [students] = await pool.query(query, [classId]);

  return students;
};

const getStudentDetails = async (studentId) => {
  const query = 'SELECT * FROM students WHERE id = ?';
  const [student] = await pool.query(query, [studentId]);

  return student[0];
};

module.exports = { getAllClassStudents, getStudentDetails };
