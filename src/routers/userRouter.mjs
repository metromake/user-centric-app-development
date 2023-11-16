import express from 'express';
import {
  deleteUser,
  getUser,
  postUser,
  putUser,
} from '../controller/userController.mjs';

const userRouter = express.Router();

userRouter.route('/').get(getUser).post(postUser);

userRouter.route('/:id').get(getUser).put(putUser).delete(deleteUser);

export default userRouter;
