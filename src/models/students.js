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

const addStudent = async (payload) => {
  const values = {
    ...payload,
    attendance: 0,
    onLeave: 0,
    absence: 0,
    registerDate: new Date(),
    status: 'Active',
    imgFile: 'student-kamal.jpg',
  };

  const query = `INSERT INTO students VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  await pool.query(query, [
    values.id,
    values.name,
    values.classId,
    values.birthDate,
    values.birthPlace,
    values.religion,
    values.address,
    values.postalCode,
    values.phone,
    values.email,
    values.guardianName || '',
    values.guardianOccupation || '',
    values.fatherName,
    values.fatherOccupation,
    values.motherName,
    values.motherOccupation,
    values.attendance,
    values.onLeave,
    values.absence,
    values.registerDate,
    values.status,
    values.imgFile,
  ]);
};

module.exports = { getAllClassStudents, getStudentDetails, addStudent };
