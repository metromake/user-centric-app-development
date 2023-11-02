import userController from '../../controller/userController.js';

const deleteUser = async (req, res) => {
  const id = req.params.id;
  const user = userController.deleteUser(id);
  if (user) res.status(200).json(user);
  else res.status(404).json({message: `User with id ${id} not found`});
};

export default deleteUser;
