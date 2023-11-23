import express from 'express';
import {getMe, postLogin} from '../controller/authController.mjs';
import authenticateToken from '../middlewares/authentication.mjs';
import {body} from 'express-validator';

const authRouter = express.Router();

authRouter
  .route('/login')
  .post(
    body('username').trim().isLength({min: 3, max: 20}),
    body('password').trim().isLength({min: 8}),
    postLogin
  );
authRouter.route('/me').get(authenticateToken, getMe);

export default authRouter;
