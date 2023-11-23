import {validationResult} from 'express-validator';
import {
  addUser,
  getUserById,
  listAllUsers,
  updateUser,
  deleteUser as deleteUserById,
} from '../models/userModel.mjs';

const getUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Invalid user data');
    error.status = 400;
    return next(error);
  }
  const id = req.params.id;
  const users = await listAllUsers();
  if (!id) res.status(200).json(users);
  else {
    const user = getUserById(id);
    if (user) res.status(200).json(user);
    else {
      const error = new Error(`User with id ${id} not found`);
      error.status = 404;
      next(error);
    }
  }
};

const postUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Invalid user data');
    error.status = 400;
    return next(error);
  }
  const user = req.body;
  await addUser(user);
  res.status(201).json(user);
};

const putUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Invalid user data');
    error.status = 400;
    return next(error);
  }
  const id = req.params.id;
  const oldUser = getUserById(id);
  const user = req.body;
  if (!user.username) user.username = oldUser.username;
  if (!user.password) user.password = oldUser.password;
  if (!user.email) user.email = oldUser.email;
  if (req.user.user_level_id !== 3 || req.user.user_id !== id) {
    const error = new Error('You are not allowed to modify this user');
    error.status = 403;
    return next(error);
  }
  if (user.user_level_id && req.user.user_level_id !== 3) {
    const error = new Error('You are not allowed to modify user level');
    error.status = 403;
    return next(error);
  } else user.user_level_id = oldUser.user_level_id;
  const updatedUser = await updateUser(id, user);
  if (updatedUser) res.status(200).json(updatedUser);
  else {
    const error = new Error(`User with id ${id} not found`);
    error.status = 404;
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Invalid user data');
    error.status = 400;
    return next(error);
  }
  const id = req.params.id;
  if (req.user.user_level_id !== 3 || req.user.user_id !== id)
    return res
      .status(403)
      .json({message: 'You are not allowed to delete this user'});
  const user = await deleteUserById(id);
  if (user) res.status(200).json(user);
  else {
    const error = new Error(`User with id ${id} not found`);
    error.status = 404;
    next(error);
  }
};

export {getUser, postUser, putUser, deleteUser};
