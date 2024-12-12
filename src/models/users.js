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

module.exports = { getUserByUsername, getUserById, addUser };
