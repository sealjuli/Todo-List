require("dotenv").config(); // Пакет dotenv имортируется для того, чтобы можно было использовать переменные окружения
const express = require("express");

const swaggerUi = require("swagger-ui-express"); // Подключение Swagger UI к Node.js
const swaggerSpec = require("../swaggerSpec.js");

const app = express();

// Инициализация Sentry
const Sentry = require("@sentry/node");

Sentry.init({
  dsn: "https://909c0ed5cdc2e8256ff5ba0ba2e4ed90@o4507798406823936.ingest.de.sentry.io/4507798414884944",
  // Другие опции настройки
});

// Обработчики Sentry
Sentry.setupExpressErrorHandler(app);

app.use(express.json()); //  Этот middleware парсит JSON-запросы, предоставляя доступ к данным в формате JSON в req.body

// Определяем маршрут для Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// функция логирования
function loggerMiddleware(req, res, next) {
  console.log(`Запрос по адресу: ${req.url}`);
  next(); // Передать управление следующему middleware
}

app.use(loggerMiddleware); // будет выполняться для каждого запроса (если без указания маршрута)

const router = require("./routes"); // загружаем из папки routes файл index по умолчанию
app.use("/api", router); // будет выполняться для всех запросов, начинающихся с "/api" (get/post/put/...)

const PORT = process.env.PORT; // загрузка переменных окружения

// Подключение соединения c MongoDB
const mongoose = require("mongoose");
const connectDb = require("./config/db.js");

connectDb();

mongoose.connection.once("open", () => {
  console.log("Connect mongoose DB");
  app.listen(PORT, () =>
    console.log(`Сервер запущен на http://localhost:${PORT}`)
  );
});

/*
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
*/
