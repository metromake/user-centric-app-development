import express from 'express';
import {getMe, postLogin} from '../controller/authController.mjs';
import authenticateToken from '../middlewares/authentication.mjs';

const authRouter = express.Router();

authRouter.route('/login').post(postLogin);
authRouter.route('/me').get(authenticateToken, getMe);

export default authRouter;
