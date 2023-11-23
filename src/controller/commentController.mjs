import {validationResult} from 'express-validator';
import {
  getCommentById,
  addComment,
  updateComment,
  deleteComment as deleteCommentFromDb,
  listAllComments,
} from '../models/commentModel.mjs';

const getComment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Invalid comment data');
    error.status = 400;
    return next(error);
  }
  const id = req.params.id;
  const comments = await listAllComments();
  if (!id) res.status(200).json(comments);
  else {
    const comment = await getCommentById(id);
    if (comment) res.status(200).json(comment);
    else {
      const error = new Error(`Comment with id ${id} not found`);
      error.status = 404;
      next(error);
    }
  }
};

const postComment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Invalid comment data');
    error.status = 400;
    return next(error);
  }
  const comment = req.body;

  comment.user_id = req.user.user_id;
  await addComment(comment);
  res.status(201).json(comment);
};

const putComment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Invalid comment data');
    error.status = 400;
    return next(error);
  }
  const id = req.params.id;
  const oldComment = await getCommentById(id);
  if (req.user.user_level_id !== 2 || req.user.user_id !== oldComment.user_id) {
    const error = new Error('You are not allowed to modify this comment');
    error.status = 403;
    return next(error);
  }
  const comment = req.body;
  const updatedComment = await updateComment(id, updatedComment);
  if (updatedComment) res.status(200).json(updatedComment);
  else {
    const error = new Error(`Comment with id ${id} not found`);
    error.status = 404;
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Invalid comment data');
    error.status = 400;
    return next(error);
  }
  const id = req.params.id;
  const oldComment = await getCommentById(id);
  if (req.user.user_level_id !== 2 || req.user.user_id !== oldComment.user_id)
    return res
      .status(403)
      .json({message: 'You are not allowed to modify this comment'});
  const comment = await deleteCommentFromDb(id);
  if (comment) res.status(200).json(comment);
  else {
    const error = new Error(`Comment with id ${id} not found`);
    error.status = 404;
    next(error);
  }
};

export {getComment, postComment, putComment, deleteComment};
