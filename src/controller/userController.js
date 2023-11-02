import usersJson from '../../data/users.json' assert {type: 'json'};

class UserController {
  data = usersJson.data;
  constructor() {}

  get users() {
    return this.data;
  }

  getUser(id) {
    return this.data.find(user => user.user_id === +id);
  }

  addUser(user) {
    if (!user.user_id)
      user.user_id = Math.max(...this.data.map(user => user.user_id)) + 1;
    user.user_created_at = new Date().toISOString();
    this.data.push(user);
    return user;
  }

  updateUser(id, user) {
    const newUser = this.getUser(id);
    if (!newUser) return null;
    if (user.user_id) newUser.user_id = user.user_id;
    if (user.username) newUser.username = user.username;
    if (user.password) newUser.password = user.password;
    if (user.email) newUser.email = user.email;
    if (user.user_level_id) newUser.user_level_id = user.user_level_id;

    return newUser;
  }

  deleteUser(id) {
    const index = this.data.findIndex(user => user.user_id === +id);
    if (index !== -1) {
      const user = this.data[index];
      this.data.splice(index, 1);
      return user;
    }
    return null;
  }
}

export default new UserController();
