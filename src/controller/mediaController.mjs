import {validationResult} from 'express-validator';
import {
  addMedia,
  getMediaById,
  listAllMedia,
  updateMedia,
  deleteMedia as deleteMediaFromDb,
} from '../models/mediaModel.mjs';

const getMedia = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Invalid media data');
    error.status = 400;
    return next(error);
  }
  const id = req.params.id;
  const media = await listAllMedia();
  if (!id) res.status(200).json(media);
  else {
    const media = await getMediaById(id);
    if (media) res.status(200).json(media);
    else {
      const error = new Error(`Media with id ${id} not found`);
      error.status = 404;
      next(error);
    }
  }
};

const postMedia = async (req, res, next) => {
  if (!req.file) {
    const error = new Error('No media file provided');
    error.status = 400;
    return next(error);
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Invalid media data');
    error.status = 400;
    return next(error);
  }

  const {filename, size, mimetype} = req.file;
  const {title, description, user_id} = req.body;
  const media = await addMedia({
    filename,
    size,
    mimetype,
    title,
    description,
    user_id,
  });
  if (media?.media_id) res.status(201);
  else {
    const error = new Error('Media could not be uploaded');
    error.status = 500;
    next(error);
  }
};

const putMedia = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Invalid media data');
    error.status = 400;
    return next(error);
  }
  const id = +req.params.id;
  const oldMedia = await getMediaById(id);
  if (req.user.user_level_id !== 2 || req.user.user_id !== oldMedia.user_id) {
    const error = new Error('You are not allowed to modify this media');
    error.status = 403;
    return next(error);
  }
  const media = req.body;
  if (media) {
    const updatedMedia = await updateMedia(id, media);
    if (updatedMedia) res.status(200);
    else {
      const error = new Error(`Media with id ${id} not found`);
      error.status = 404;
      next(error);
    }
  } else {
    const error = new Error('Invalid media data');
    error.status = 400;
    next(error);
  }
};

const deleteMedia = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Invalid media data');
    error.status = 400;
    return next(error);
  }
  const id = req.params.id;
  const oldMedia = await getMediaById(id);
  if (req.user.user_level_id !== 2 || req.user.user_id !== oldMedia.user_id) {
    const error = new Error('You are not allowed to delete this media');
    error.status = 403;
    return next(error);
  }
  const media = await deleteMediaFromDb(id);
  if (media) res.status(200);
  else {
    const error = new Error(`Media with id ${id} not found`);
    error.status = 404;
    next(error);
  }
};

export {getMedia, postMedia, putMedia, deleteMedia};
