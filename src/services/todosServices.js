const db = require("../config/db");

class TodosServices {
  async createTask(task) {
    let database;
    try {
      database = await db.connect();
      const newTask = await database.query(
        'INSERT INTO public."Tasks" (title, "isCompleted", "idUser") VALUES ($1, $2, $3) RETURNING *',
        [task.title, task.isCompleted, task.idUser]
      );
      return newTask;
    } catch (err) {
      console.log("Error ", err);
      throw err;
    } finally {
      if (database) {
        // db.end();
        database.release();
      }
    }
  }

  async findTaskById(id) {
    let database;
    try {
      database = await db.connect();
      const task = await database.query(
        'Select * FROM public."Tasks" WHERE id = $1',
        [id]
      );
      return task.rows[0];
    } catch (err) {
      console.log("Error ", err);
      throw err;
    } finally {
      if (database) {
        // db.end();
        database.release();
      }
    }
  }

  async getTasks() {
    let database;
    try {
      database = await db.connect();
      const data = await database.query('Select * FROM public."Tasks"');
      return data.rows;
    } catch (err) {
      console.log("Error ", err);
      throw err;
    } finally {
      if (database) {
        // db.end();
        database.release();
      }
    }
  }

  async updateTask(id, title) {
    let database;
    try {
      database = await db.connect();
      const task = await database.query(
        'UPDATE public."Tasks" SET title = $1 WHERE id = $2',
        [title, id]
      );
      return task;
    } catch (err) {
      console.log("Error ", err);
      throw err;
    } finally {
      if (database) {
        // db.end();
        database.release();
      }
    }
  }

  async updateComplete(id, isCompleted) {
    let database;
    try {
      database = await db.connect();
      const task = await database.query(
        'UPDATE public."Tasks" SET "isCompleted" = $1 WHERE id = $2',
        [!isCompleted, id]
      );
      return task;
    } catch (err) {
      console.log("Error ", err);
      throw err;
    } finally {
      if (database) {
        // db.end();
        database.release();
      }
    }
  }

  async deleteTask(id) {
    let database;
    try {
      database = await db.connect();
      await database.query('DELETE FROM public."Tasks" WHERE id = $1', [id]);
    } catch (err) {
      console.log("Error ", err);
      throw err;
    } finally {
      if (database) {
        // db.end();
        database.release();
      }
    }
  }
}

module.exports = new TodosServices();

/*
const Tasks = require("../models/tasks.model");

class TodosServices {
  async createTask(task) {
    const newTask = await Tasks.create(task);
    return newTask;
  }

  async findTaskById(id) {
    const task = await Tasks.findOne({ where: { id } });
    return task;
  }

  async getTasks() {
    const data = await Tasks.findAll({});
    return data;
  }

  async updateTask(id, title) {
    const task = await Tasks.update({ title }, { where: { id } });
    return task;
  }

  async updateComplete(id, isCompleted) {
    const task = await Tasks.update(
      { isCompleted: !isCompleted },
      { where: { id } }
    );
    return task;
  }

  async deleteTask(id) {
    await Tasks.destroy({ where: { id } });
  }
}

module.exports = new TodosServices();
*/

/*const { ObjectId } = require("mongodb");
const Task = require("../models/tasksModel");

class TodosServices {
  async getTasks() {
    const data = await Task.find({}).populate("idUser");
    return data;
  }

  async createTask(task) {
    const newTask = new Task(task);
    const result = newTask.save();
    return result;
  }

  async findTaskById(id) {
    const task = await Task.findOne({ _id: new ObjectId(id) });
    return task;
  }

  async updateTask(id, title) {
    const task = await Task.findByIdAndUpdate(new ObjectId(id), { title });
    return task;
  }

  async updateComplete(id, isCompleted) {
    const task = await Task.findByIdAndUpdate(new ObjectId(id), {
      isCompleted: !isCompleted,
    });
    return task;
  }

  async deleteTask(id) {
    await Task.findByIdAndDelete(new ObjectId(id));
  }
}

module.exports = new TodosServices();
*/

/*
const { ObjectId } = require("mongodb");
const { getConnection, useDefaultDb } = require("../helpers/mongoHelper");

class TodosServices {
  #COLLECTION = "tasks";

  async getTasks() {
    const connection = await getConnection();
    const db = useDefaultDb(connection);
    const data = await db.collection(this.#COLLECTION).find({}).toArray();
    connection.close();
    return data;
  }

  async createTask(task) {
    const connection = await getConnection();
    const db = useDefaultDb(connection);
    await db.collection(this.#COLLECTION).insertOne(task);
    connection.close();
  }

  async findTaskById(id) {
    const connection = await getConnection();
    const db = useDefaultDb(connection);
    const data = await db
      .collection(this.#COLLECTION)
      .aggregate([{ $match: { _id: new ObjectId(id) } }])
      .toArray();
    connection.close();
    return data[0];
  }

  async updateTask(id, title) {
    const connection = await getConnection();
    const db = useDefaultDb(connection);
    await db
      .collection(this.#COLLECTION)
      .updateOne({ _id: new ObjectId(id) }, { $set: { title } });
    connection.close();
  }

  async updateComplete(id, isCompleted) {
    const connection = await getConnection();
    const db = useDefaultDb(connection);
    await db
      .collection(this.#COLLECTION)
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { isCompleted: !isCompleted } }
      );
    connection.close();
  }

  async deleteTask(id) {
    const connection = await getConnection();
    const db = useDefaultDb(connection);
    await db.collection(this.#COLLECTION).deleteOne({ _id: new ObjectId(id) });
    connection.close();
  }
}

module.exports = new TodosServices();
*/

/*
const FileHelper = require("../helpers/fileHelper");

class TodosServices {
  async getTasks() {
    const data = await FileHelper.readFile("data.json");
    return data;
  }

  async createTask(task) {
    const data = await FileHelper.readFile("data.json");
    data.push(task);
    return await FileHelper.writeFile("data.json", data);
  }

  async findTaskIndexById(id) {
    const data = await FileHelper.readFile("data.json");
    return data.findIndex((val) => val.id === id);
  }

  async updateTitleByIndex(index, title) {
    const data = await FileHelper.readFile("data.json");
    data[index].title = title;
    return await FileHelper.writeFile("data.json", data);
  }

  async getTaskById(id) {
    const data = await FileHelper.readFile("data.json");
    return data.find((val) => val.id === id);
  }

  async updateCompleteByIndex(index) {
    const data = await FileHelper.readFile("data.json");
    data[index].isCompleted = !data[index].isCompleted;
    return await FileHelper.writeFile("data.json", data);
  }

  async deleteTaskByIndex(index) {
    const data = await FileHelper.readFile("data.json");
    data.splice(index, 1);
    return await FileHelper.writeFile("data.json", data);
  }
}

module.exports = new TodosServices();
*/
