import userController from '../../controller/userController.js';

const getUser = async (req, res) => {
  const id = req.params.id;
  if (!id) res.status(200).json(userController.users);
  else {
    const user = userController.getUser(id);
    if (user) res.status(200).json(user);
    else res.status(404).json({message: `User with id ${id} not found`});
  }
};

export default getUser;
