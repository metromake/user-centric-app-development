import {
  addUser,
  getUserById,
  listAllUsers,
  updateUser,
  deleteUser as deleteUserById,
} from '../models/userModel.mjs';

const getUser = async (req, res) => {
  const id = req.params.id;
  const users = await listAllUsers();
  if (!id) res.status(200).json(users);
  else {
    const user = getUserById(id);
    if (user) res.status(200).json(user);
    else res.status(404).json({message: `User with id ${id} not found`});
  }
};

const postUser = async (req, res) => {
  const user = req.body;
  if (!user) res.status(400).json({message: 'User data is required'});
  else {
    await addUser(user);
    res.status(201).json(user);
  }
};

const putUser = async (req, res) => {
  const id = req.params.id;
  const user = req.body;
  if (!user) res.status(400).json({message: 'User data is required'});
  else {
    const updatedUser = await updateUser(id, user);
    if (updatedUser) res.status(200).json(updatedUser);
    else res.status(404).json({message: `User with id ${id} not found`});
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  const user = await deleteUserById(id);
  if (user) res.status(200).json(user);
  else res.status(404).json({message: `User with id ${id} not found`});
};

export {getUser, postUser, putUser, deleteUser};
