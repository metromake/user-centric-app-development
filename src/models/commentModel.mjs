import promisePool from '../utils/database.mjs';

const listAllComments = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM Comments');
    return rows;
  } catch (error) {
    console.error('listAllComments error', error.message);
    return null;
  }
};

const getCommentById = async id => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM Comments WHERE comment_id = ?',
      [id]
    );
    return rows[0];
  } catch (error) {
    console.error('getCommentById error', error.message);
    return null;
  }
};

const addComment = async comment => {
  try {
    const [rows] = await promisePool.query(
      'INSERT INTO Comments (comment_text, user_id, media_id, created_at) VALUES (?, ?, ?, ?)',
      [
        comment.comment_text,
        comment.user_id,
        comment.media_id,
        new Date().toISOString().slice(0, 19).replace('T', ' '),
      ]
    );
    return rows.insertId;
  } catch (error) {
    console.error('addComment error', error.message);
    return null;
  }
};

const updateComment = async (id, comment) => {
  try {
    const [rows] = await promisePool.query(
      'UPDATE Comments SET comment_text = ?, user_id = ?, media_id = ?, created_at = ? WHERE id = ?',
      [
        comment.comment_text,
        comment.user_id,
        comment.media_id,
        comment.created_at,
        id,
      ]
    );
    return rows.affectedRows === 1;
  } catch (error) {
    console.error('updateComment error', error.message);
    return null;
  }
};

const deleteComment = async id => {
  try {
    const [rows] = await promisePool.query(
      'DELETE FROM Comments WHERE comment_id = ?',
      [id]
    );
    return rows.affectedRows === 1;
  } catch (error) {
    console.error('deleteComment error', error.message);
    return null;
  }
};

export {
  listAllComments,
  getCommentById,
  addComment,
  updateComment,
  deleteComment,
};
