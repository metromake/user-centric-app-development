import express from 'express';
import {
  deleteUser,
  getUser,
  postUser,
  putUser,
} from '../controller/userController.mjs';
import authenticateToken from '../middlewares/authentication.mjs';
import {body} from 'express-validator';

const userRouter = express.Router();

userRouter
  .route('/')
  .get(getUser)
  .post(
    body('username').trim().isLength({min: 3, max: 20}),
    body('password').trim().isLength({min: 8}),
    body('email').trim().isEmail(),
    postUser
  );

userRouter
  .route('/:id')
  .get(getUser)
  .put(
    body('userame').trim().isLength({min: 3, max: 20}),
    body('password').trim().isLength({min: 8}),
    body('email').trim().isEmail(),
    body('user_level_id').optional().trim().isInt().toInt(),
    authenticateToken,
    putUser
  )
  .delete(authenticateToken, deleteUser);

export default userRouter;
