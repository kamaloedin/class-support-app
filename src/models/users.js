const { nanoid } = require('nanoid');
const pool = require('../config/database');

const getUserByUsername = async (username) => {
  const query = 'SELECT * FROM users WHERE username = ?';
  const [user] = await pool.query(query, [username]);

  return user[0];
};

const getUserById = async (id) => {
  const query = 'SELECT * FROM users WHERE id = ?';
  const [user] = await pool.query(query, [id]);

  return user[0];
};

const addUser = async ({ username, password, empId }) => {
  const id = `user-${nanoid(5)}`;
  const query = 'INSERT INTO users VALUES(?, ?, ?, ?)';
  const user = await pool.query(query, [id, username, password, empId]);
  return user;
};

const getUserCredentialsByUsername = async (username) => {
  const query = `SELECT users.id, users.username, users.username, users.password, users.employee_id, employees.role_id
                FROM users
                LEFT JOIN employees
                ON users.employee_id = employees.id
                WHERE users.username = ?`;
  const [user] = await pool.query(query, [username]);

  return user[0];
};

const getUserCredentialsById = async (id) => {
  const query = `SELECT users.id, users.username, users.username, users.password, users.employee_id, employees.role_id
                FROM users
                LEFT JOIN employees
                ON users.employee_id = employees.id
                WHERE users.id = ?`;
  const [user] = await pool.query(query, [id]);

  return user[0];
};

const checkUserDuplicate = async (empId) => {
  const query = `SELECT employee_id FROM users WHERE employee_id = ?`;
  const [user] = await pool.query(query, [empId]);

  if (user.length) {
    throw new Error('User for this employee already exists');
  }
};

module.exports = {
  getUserByUsername,
  getUserById,
  addUser,
  getUserCredentialsByUsername,
  getUserCredentialsById,
  checkUserDuplicate,
};
