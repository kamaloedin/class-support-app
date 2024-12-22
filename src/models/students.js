const pool = require('../config/database');

const getAllStudents = async () => {
  const query = `SELECT students.id, students.name, students.class_id, classes.name AS class_name
                  FROM students
                  INNER JOIN classes
                  ON students.class_id = classes.id
                  ORDER BY class_id, name`;
  const [students] = await pool.query(query);

  return students;
};

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

const updateStudent = async (payload) => {
  const query = `UPDATE students 
                  SET name = ?, class_id = ?, birth_date = ?, birth_place = ?, religion = ?, address = ?, postal_code = ?,phone = ?, email = ?, guardian_name = ?, guardian_occupation = ?, father_name = ?, father_occupation  = ?, mother_name = ?, guardian_occupation = ? WHERE id = ?`;

  await pool.query(query, [
    payload.name,
    payload.classId,
    payload.birthDate,
    payload.birthPlace,
    payload.religion,
    payload.address,
    payload.postalCode,
    payload.phone,
    payload.email,
    payload.guardianName || '',
    payload.guardianOccupation || '',
    payload.fatherName,
    payload.fatherOccupation,
    payload.motherName,
    payload.motherOccupation,
    payload.id,
  ]);
};

module.exports = {
  getAllStudents,
  getAllClassStudents,
  getStudentDetails,
  addStudent,
  updateStudent,
};
