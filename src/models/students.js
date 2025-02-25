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
  const query = `SELECT id, name FROM students WHERE class_id = ? AND status = 'Active'`;
  const [students] = await pool.query(query, [classId]);

  return students;
};

const getStudentDetails = async (studentId) => {
  const query = `SELECT students.*, classes.name AS class_name
                  FROM students
                  INNER JOIN classes
                  ON students.class_id = classes.id
                  WHERE students.id = ?`;
  const [student] = await pool.query(query, [studentId]);

  return student[0];
};

const addStudent = async (payload) => {
  const values = {
    ...payload,
    attendance: 0,
    on_leave: 0,
    absence: 0,
    register_date: new Date(),
    status: 'Active',
  };

  const query = `INSERT INTO students VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  await pool.query(query, [
    values.id,
    values.name,
    values.class_id,
    values.birth_date,
    values.birth_place,
    values.religion,
    values.address,
    values.postal_code,
    values.phone,
    values.email,
    values.guardian_name || '',
    values.guardian_occupation || '',
    values.father_name,
    values.father_occupation,
    values.mother_name,
    values.mother_occupation,
    values.attendance,
    values.on_leave,
    values.absence,
    values.register_date,
    values.status,
    values.img_file,
  ]);
};

const updateStudent = async (payload) => {
  const query = `UPDATE students 
                  SET name = ?, class_id = ?, birth_date = ?, birth_place = ?, religion = ?, address = ?, postal_code = ?,phone = ?, email = ?, guardian_name = ?, guardian_occupation = ?, father_name = ?, father_occupation  = ?, mother_name = ?, mother_occupation = ?, status = ?, img_file = ? WHERE id = ?`;

  await pool.query(query, [
    payload.name,
    payload.class_id,
    payload.birth_date,
    payload.birth_place,
    payload.religion,
    payload.address,
    payload.postal_code,
    payload.phone,
    payload.email,
    payload.guardian_name || '',
    payload.guardian_occupation || '',
    payload.father_name,
    payload.father_occupation,
    payload.mother_name,
    payload.mother_occupation,
    payload.status,
    payload.img_file,
    payload.id,
  ]);
};

const verifyStudentId = async (studentId) => {
  const query = `SELECT id FROM students WHERE id = ?`;
  const [student] = await pool.query(query, studentId);
  if (!student.length) {
    throw new Error('Student with this ID cannot be found');
  }
};

const expelStudent = async (studentId) => {
  const query = `UPDATE students SET status = 'Expelled' WHERE id = ?`;
  const [results] = await pool.query(query, studentId);
  if (!results.affectedRows) {
    throw new Error('Student cannot be deleted or found');
  }
};

module.exports = {
  getAllStudents,
  getAllClassStudents,
  getStudentDetails,
  addStudent,
  updateStudent,
  expelStudent,
  verifyStudentId,
};
