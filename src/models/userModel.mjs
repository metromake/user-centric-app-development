import promisePool from '../utils/database.mjs';

const listAllUsers = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM Users');
    return rows;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getUserById = async id => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM Users WHERE user_id = ?',
      [id]
    );
    return rows[0];
  } catch (error) {
    console.error(error);
    return null;
  }
};

const addUser = async user => {
  try {
    const [rows] = await promisePool.query(
      'INSERT INTO Users (username, password, email, user_level_id, created_at) VALUES (?, ?, ?, ?, ?)',
      [
        user.username,
        user.password,
        user.email,
        1,
        new Date().toISOString().slice(0, 19).replace('T', ' '),
      ]
    );
    return rows.insertId;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const updateUser = async (id, user) => {
  try {
    const [rows] = await promisePool.query(
      'UPDATE Users SET username = ?, password = ?, email = ?, user_level_id = ?, WHERE user_id = ?',
      [user.username, user.password, user.email, user.user_level_id, id]
    );
    return rows.affectedRows === 1;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const deleteUser = async id => {
  try {
    const [rows] = await promisePool.query(
      'DELETE FROM Users WHERE user_id = ?',
      [id]
    );
    return rows.affectedRows === 1;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const login = async (username, password) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM Users WHERE username = ? AND password = ?',
      [username, password]
    );
    return rows[0];
  } catch (error) {
    console.error(error);
    return null;
  }
};

export {listAllUsers, getUserById, addUser, updateUser, deleteUser, login};
