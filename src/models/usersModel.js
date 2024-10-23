const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// Определение схемы данных
const userSchema = new Schema({
  login: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Создание модели
const UserModel = model("users", userSchema);

module.exports = UserModel;
