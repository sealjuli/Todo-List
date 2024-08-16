const express = require("express");
const router = express.Router();

const TodosControllers = require("../controllers/todosControllers");
const authenticateToken = require("../middleware/authentificateToken");
const validationMiddleware = require("../middleware/validationTodo");

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Получить список тасок
 *     description: Получение списка тасок из базы данных
 *     tags:
 *       - Todos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Массив тасок
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 94c7e23a-0474-4d7c-979c-d647e70df3b5
 *         title:
 *           type: string
 *           example: Node.js
 *         isCompleted:
 *           type: boolean
 *           example: false
 *         idUser:
 *           type: string
 *           example: ff88d65d-fb2b-4f6f-97ab-081122c19862
 */
router.get("/", authenticateToken, TodosControllers.getTasks);

/**
 * @swagger
 * /api/todos:
 *    post:
 *      summary: Создать новую таску
 *      description: Добавить в базу данных новое задание
 *      tags:
 *        - Todos
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *        $ref: "#/components/requestBodies/Todos"
 *      responses:
 *        200:
 *          description: Таска успешно создана
 * components:
 *   requestBodies:
 *     Todos:
 *       description: Свойства таски, которая была добавлена
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Node.js
 *                 description: Название таски
 *               isCompleted:
 *                 type: boolean
 *                 example: false
 *                 description: Выполнена ли таска
 */
router.post(
  "/",
  authenticateToken,
  validationMiddleware.validateBody,
  TodosControllers.createTask
);

/**
 * @swagger
 * /api/todos/{id}:
 *   patch:
 *     summary: Обновление title таски
 *     description: Обновляет title таски по его id
 *     tags:
 *       - Todos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Идентификатор таски
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Модуль JS
 *     responses:
 *       200:
 *         description: Данные таски успешно обновлены.
 */
router.patch(
  "/:id",
  authenticateToken,
  validationMiddleware.validateTitle,
  validationMiddleware.validateParamId,
  TodosControllers.updateTaskTitle
);

/**
 * @swagger
 * /api/todos/{id}/{isCompleted}:
 *   patch:
 *     summary: Обновление isCompleted таски
 *     description: Обновляет isCompleted таски на противоположное по его id
 *     tags:
 *       - Todos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Идентификатор таски
 *       - in: path
 *         name: isCompleted
 *         required: true
 *         schema:
 *           type: integer
 *         description: Если isCompleted = 1 меняет статус задания на противоположный (должен быть равен 1).
 *     responses:
 *       200:
 *         description: Данные таски успешно обновлены.
 */
router.patch(
  "/:id/:isCompleted",
  authenticateToken,
  validationMiddleware.validateParamId,
  validationMiddleware.validateParamComplete,
  TodosControllers.updateTaskComplete
);

/**
 * @swagger
 * /api/todos/{id}:
 *    delete:
 *      summary: Удалить таску
 *      description: Удалить задание из базы данных
 *      tags:
 *        - Todos
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Идентификатор таски
 *      responses:
 *        200:
 *          description: Успешное удаление таски
 */
router.delete(
  "/:id",
authenticateToken,
 validationMiddleware.validateParamId,
 TodosControllers.deleteTask
);

module.exports = router;
