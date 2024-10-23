const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// Определение схемы данных
const taskSchema = new Schema({
  title: String,
  isCompleted: Boolean,
  idUser: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

// Создание модели
const TaskModel = model("tasks", taskSchema);

module.exports = TaskModel;
