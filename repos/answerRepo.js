let fs = require('fs');

const FILE_NAME = './assets/answers.json';

let answerRepo = {
  get: function (resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      }
      else {
        resolve(JSON.parse(data));
      }
    });
  },
  getById: function (id, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      }
      else {
        let answer = JSON.parse(data).find(p => p.id == id);
        resolve(answer);
      }
    });
  },
  search: function (searchObject, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      }
      else {
        let answers = JSON.parse(data);
        // Perform search
        if (searchObject) {
          answers = answers.filter(
            p => (searchObject.id ? p.id == searchObject.id : true) &&
              (searchObject.name ? p.name.toLowerCase().indexOf(searchObject.name) >= 0 : true));
        }

        resolve(answers);
      }
    });
  }
};

module.exports = answerRepo;