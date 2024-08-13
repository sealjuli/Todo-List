const FileHelper = require("../helpers/fileHelper");

class UsersServices {
  async findUserByLogin(login) {
    const users = await FileHelper.readFile("users.json");
    return users.find((val) => val.login === login);
  }

  async saveUser(user) {
    const users = await FileHelper.readFile("users.json");
    users.push(user);
    return await FileHelper.writeFile("users.json", users);
  }
}

module.exports = new UsersServices();
