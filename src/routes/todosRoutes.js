const express = require("express");
const router = express.Router();

const TodosControllers = require("../controllers/todosControllers");
const authenticateToken = require("../middleware/authentificateToken");
const validationMiddleware = require("../middleware/validationTodo");

// read
router.get("/", authenticateToken, TodosControllers.getTasks);

// create
router.post(
  "/",
  authenticateToken,
  validationMiddleware.validateBody,
  TodosControllers.createTask
);

// update
router.patch(
  "/:id",
  authenticateToken,
  validationMiddleware.validateTitle,
  validationMiddleware.validateParamId,
  TodosControllers.updateTaskTitle
);

router.patch(
  "/:id/:isCompleted",
  authenticateToken,
  validationMiddleware.validateParamId,
  validationMiddleware.validateParamComplete,
  TodosControllers.updateTaskComplete
);

// delete
router.delete(
  "/:id",
authenticateToken,
 validationMiddleware.validateParamId,
 TodosControllers.deleteTask
);

module.exports = router;
