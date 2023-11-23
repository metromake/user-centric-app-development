import jwt from 'jsonwebtoken';
import {login} from '../models/userModel.mjs';
import {validationResult} from 'express-validator';

const postLogin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Invalid user data');
    error.status = 400;
    return next(error);
  }
  const user = await login(req.body.username, req.body.password);
  if (user) {
    const token = jwt.sign(user, process.env.JWT_SECRET, {expiresIn: '24h'});
    res.status(200).json({...user, token});
  } else {
    const error = new Error('Invalid username or password');
    error.status = 401;
    next(error);
  }
};

const getMe = async (req, res) => {
  if (!req.user) {
    const error = new Error('Invalid user data');
    error.status = 400;
    return next(error);
  }
  res.status(200).json(req.user);
};

export {postLogin, getMe};
