import promisePool from '../utils/database.mjs';

const listAllMedia = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM MediaItems');
    return rows;
  } catch (error) {
    console.error('listAllMedia error', error.message);
    return null;
  }
};

const getMediaById = async id => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM MediaItems WHERE media_id = ?',
      [id]
    );
    return rows[0];
  } catch (error) {
    console.error('getMediaById error', error.message);
    return null;
  }
};

const addMedia = async media => {
  try {
    const [rows] = await promisePool.query(
      'INSERT INTO MediaItems (filename, filesize, title, description, user_id, media_type, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        media.filename,
        media.size,
        media.title,
        media.description,
        media.user_id,
        media.mimetype,
        new Date().toISOString().slice(0, 19).replace('T', ' '),
      ]
    );
    return rows.insertId;
  } catch (error) {
    console.error('addMedia error', error.message);
    return null;
  }
};

const updateMedia = async (id, media) => {
  try {
    const [rows] = await promisePool.query(
      'UPDATE MediaItems SET filename = ?, mimetype = ?, filesize = ?, title = ?, description = ?, user_id = ?, media_type = ?, created_at = ? WHERE id = ?',
      [
        media.filename,
        media.mimetype,
        media.filesize,
        media.title,
        media.description,
        media.user_id,
        media.media_type,
        media.created_at,
        id,
      ]
    );
    return rows.affectedRows === 1 ? rows : null;
  } catch (error) {
    console.error('updateMedia error', error.message);
    return null;
  }
};

const deleteMedia = async id => {
  try {
    const [rows] = await promisePool.query(
      'DELETE FROM MediaItems WHERE id = ?',
      [id]
    );
    return rows.affectedRows === 1 ? rows : null;
  } catch (error) {
    console.error('deleteMedia error', error.message);
    return null;
  }
};

export {listAllMedia, getMediaById, addMedia, updateMedia, deleteMedia};
