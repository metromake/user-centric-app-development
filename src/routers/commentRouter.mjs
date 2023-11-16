import express from 'express';
import {
  deleteComment,
  getComment,
  postComment,
  putComment,
} from '../controller/commentController.mjs';

const commentRouter = express.Router();

commentRouter.route('/').get(getComment).post(postComment);

commentRouter
  .route('/:id')
  .get(getComment)
  .put(putComment)
  .delete(deleteComment);

export default commentRouter;
