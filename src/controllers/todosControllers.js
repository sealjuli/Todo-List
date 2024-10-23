const TodosServices = require("../services/todosServices");

// const { v4: uuidv4 } = require("uuid");

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
      // const uuid = uuidv4();
      const result = await TodosServices.createTask({
        // id: uuid,
        ...req.body,
        idUser: req.userId,
      });
      res.send("Новое задание создано.");
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
      const task = await TodosServices.findTaskById(req.params.id);
      if (!task) {
        res.send("Задание с указанным id не найдено");
      } else {
        await TodosServices.updateTask(req.params.id, req.body.title);
        res.send("Задание обновлено.");
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
      const task = await TodosServices.findTaskById(req.params.id);
      if (!task) {
        res.send("Задание с указанным id не найдено");
      } else {
        await TodosServices.updateComplete(req.params.id, task.isCompleted);
        res.send("Задание обновлено.");
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
      const task = await TodosServices.findTaskById(req.params.id);
      if (!task) {
        res.send("Задание с указанным id не найдено");
      } else {
        await TodosServices.deleteTask(req.params.id);
        res.send("Задание удалено.");
      }
    } catch (error) {
      Sentry.captureException(error);
    }
  }
}

module.exports = new TodosControllers();
