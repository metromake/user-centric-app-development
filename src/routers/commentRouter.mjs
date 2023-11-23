import express from 'express';
import {
  deleteComment,
  getComment,
  postComment,
  putComment,
} from '../controller/commentController.mjs';
import authenticateToken from '../middlewares/authentication.mjs';

const commentRouter = express.Router();

commentRouter.route('/').get(getComment).post(postComment);

commentRouter
  .route('/:id')
  .get(getComment)
  .put(authenticateToken, putComment)
  .delete(authenticateToken, deleteComment);

export default commentRouter;
