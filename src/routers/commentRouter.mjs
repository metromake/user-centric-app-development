import express from 'express';
import {
  deleteComment,
  getComment,
  postComment,
  putComment,
} from '../controller/commentController.mjs';
import authenticateToken from '../middlewares/authentication.mjs';
import {body} from 'express-validator';

const commentRouter = express.Router();

commentRouter
  .route('/')
  .get(getComment)
  .post(
    authenticateToken,
    body('comment_text').trim().isLength({min: 3, max: 100}),
    body('media_id').trim().isInt().toInt(),
    postComment
  );

commentRouter
  .route('/:id')
  .get(getComment)
  .put(
    authenticateToken,
    body('comment_text').trim().isLength({min: 3, max: 100}),
    putComment
  )
  .delete(authenticateToken, deleteComment);

export default commentRouter;
