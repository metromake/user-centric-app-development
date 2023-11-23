import jwt from 'jsonwebtoken';
import {login} from '../models/userModel.mjs';

const postLogin = async (req, res) => {
  const user = await login(req.body.username, req.body.password);
  if (user) {
    const token = jwt.sign(user, process.env.JWT_SECRET, {expiresIn: '24h'});
    res.status(200).json({...user, token});
  } else {
    res.status(401).json({error: 'Invalid username or password'});
  }
};

const getMe = async (req, res) => {
  if (!req.user) return res.status(401).json({error: 'Invalid token'});
  res.status(200).json(req.user);
};

export {postLogin, getMe};
