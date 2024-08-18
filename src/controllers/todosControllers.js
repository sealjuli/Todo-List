const TodosServices = require("../services/todosServices");

const { v4: uuidv4 } = require("uuid");

const { validationResult } = require("express-validator");

class TodosControllers {
  async getTasks(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const tasks = await TodosServices.getTasks();
      res.send(JSON.stringify(tasks));
    } catch (error) {
      Sentry.captureException(error);
    }
  }

  async createTask(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const uuid = uuidv4();
      const result = await TodosServices.createTask({
        id: uuid,
        ...req.body,
        idUser: req.userId,
      });
      res.send(
        `Новое задание создано. ${JSON.stringify({
          id: uuid,
          ...req.body,
          idUser: req.userId,
        })}`
      );
    } catch (error) {
      Sentry.captureException(error);
    }
  }

  async updateTaskTitle(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const taskIndex = await TodosServices.findTaskIndexById(req.params.id);
      if (taskIndex < 0) {
        res.send("Задание с указанным id не найдено");
      } else {
        await TodosServices.updateTitleByIndex(taskIndex, req.body.title);
        res.send(
          JSON.stringify(await TodosServices.getTaskById(req.params.id))
        );
      }
    } catch (error) {
      Sentry.captureException(error);
    }
  }

  async updateTaskComplete(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const taskIndex = await TodosServices.findTaskIndexById(req.params.id);
      if (taskIndex < 0) {
        res.send("Задание с указанным id не найдено");
      } else {
        await TodosServices.updateCompleteByIndex(taskIndex);
        res.send(
          JSON.stringify(await TodosServices.getTaskById(req.params.id))
        );
      }
    } catch (error) {
      Sentry.captureException(error);
    }
  }

  async deleteTask(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const taskIndex = await TodosServices.findTaskIndexById(req.params.id);
      if (taskIndex < 0) {
        res.send("Задание с указанным id не найдено");
      } else {
        await TodosServices.deleteTaskByIndex(taskIndex);
        res.send(JSON.stringify(await TodosServices.getTasks()));
      }
    } catch (error) {
      Sentry.captureException(error);
    }
  }
}

module.exports = new TodosControllers();
