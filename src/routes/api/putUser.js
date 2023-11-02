import userController from '../../controller/userController.js';

const putUser = async (req, res) => {
  const id = req.params.id;
  const user = req.body;
  if (!user) res.status(400).json({message: 'User data is required'});
  else {
    const updatedUser = userController.updateUser(id, user);
    if (updatedUser) res.status(200).json(updatedUser);
    else res.status(404).json({message: `User with id ${id} not found`});
  }
};

export default putUser;
