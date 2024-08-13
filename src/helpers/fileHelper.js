const fs = require("fs");

class FileHelper {
  readFile(nameFile) {
    return new Promise((res, rej) => {
      fs.readFile(nameFile, "utf8", (err, data) => {
        if (err) {
          console.error(err);
          rej(err);
        }
        res(JSON.parse(data));
      });
    });
  }

  writeFile(nameFile, data) {
    return new Promise((res, rej) => {
      fs.writeFile(nameFile, JSON.stringify(data), (err) => {
        if (err) {
          console.error(err);
          rej(err);
        }
        console.log("Файл успешно записан.");
        res(data);
      });
    });
  }
}

module.exports = new FileHelper();
