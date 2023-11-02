import userController from '../../controller/userController.js';

const postUser = async (req, res) => {
  const user = req.body;
  if (!user) res.status(400).json({message: 'User data is required'});
  else {
    userController.addUser(user);
    res.status(201).json(user);
  }
};

export default postUser;
