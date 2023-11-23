import express from 'express';
import {
  deleteUser,
  getUser,
  postUser,
  putUser,
} from '../controller/userController.mjs';
import authenticateToken from '../middlewares/authentication.mjs';

const userRouter = express.Router();

userRouter.route('/').get(getUser).post(postUser);

userRouter
  .route('/:id')
  .get(getUser)
  .put(authenticateToken, putUser)
  .delete(authenticateToken, deleteUser);

export default userRouter;
