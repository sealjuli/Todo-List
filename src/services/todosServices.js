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
