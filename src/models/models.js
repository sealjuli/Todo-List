const sequelize = require("../config/db");

const Tasks = require("./tasks.model");
const Users = require("./users.model");

/*
(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Tables synced");
  } catch (error) {
    console.error("Error syncing tables:", error);
  }
})();
*/

module.exports = { Tasks, Users };
