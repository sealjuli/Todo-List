const express = require("express");

const todosRoutes = require("./todosRoutes");
const UsersControllers = require("../controllers/usersControllers");
const validationMiddleware = require("../middleware/validationUser");

const router = express.Router();

router.use("/todos", todosRoutes);

// register
router.post(
  "/register",
  validationMiddleware.validateBodyUser,
  UsersControllers.userRegister
);

// login
router.post(
  "/login",
  validationMiddleware.validateBodyUser,
  UsersControllers.loginUser
);

module.exports = router;
