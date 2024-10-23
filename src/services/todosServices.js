const { ObjectId } = require("mongodb");
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
