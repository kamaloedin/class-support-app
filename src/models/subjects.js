const pool = require('../config/database');

const getAllSubjects = async () => {
  const query = 'SELECT * FROM subjects';

  const [subjects] = await pool.query(query);

  return subjects;
};

const addSubject = async (name) => {
  const query = `INSERT INTO subjects(name) values(?)`;
  await pool.query(query, [name]);
};

const deleteSubject = async (id) => {
  const query = `DELETE FROM subjects WHERE id = ?`;
  await pool.query(query, [id]);
};

module.exports = { getAllSubjects, addSubject, deleteSubject };
