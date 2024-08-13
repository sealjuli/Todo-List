const { body, param } = require("express-validator");

// Middleware для валидации данных
const validateBody = [
  body("title")
    .isLength({ min: 6 })
    .withMessage("Title должен иметь длину больше 5 символов."),
  body("isCompleted")
    .isIn([true, false])
    .withMessage("Поле isCompleted должено быть Boolean."),
];

const validateTitle = [
  body("title")
    .isLength({ min: 6 })
    .withMessage("Title должен иметь длину больше 5 символов."),
];

const validateParamId = [
  param("id")
    .isLength({ min: 5 })
    .withMessage("Id задания слишком короткий."),
];

const validateParamComplete = [
  param("isCompleted")
    .equals("1")
    .withMessage(
      "isCompleted = 1 меняет статус задания на противоположный (должен быть равен 1)."
    ),
];

// const validateQuery = [
//   query("username")
//     .isLength({ min: 3 })
//     .withMessage("Имя пользователя слишком короткое."),
// ];

// const validateHeader = [
//   header("hidepassword")
//     .isIn(["yes", "no"])
//     .withMessage("Значение hidepassword должно быть yes или no."),
// ];

module.exports = {
  validateBody,
  validateTitle,
  validateParamId,
  validateParamComplete,
};
