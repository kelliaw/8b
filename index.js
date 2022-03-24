// Bring in the express server and create application
let express = require('express');
let answerRepo = require('./repos/answerRepo');
let app = express();


// Use the express Router and create application
let router = express.Router()

// Create GET to return a list of all answers
router.get('/', function (req, res, next) {
    answerRepo.get(function (data) {
      res.status(200).json({
        "status": 200,
        "statusText": "OK",
        "message": "All answers retrieved.",
        "data": data
      });
    }, function (err) {
      next(err);
    });
  });
  
  // Create GET/search?id=n&name=str to search for answer by 'id' and/or 'name'
  router.get('/search', function (req, res, next) {
    let searchObject = {
      "id": req.query.id,
      "answer": req.query.answer //can't remember what i did here
    };
  
    answerRepo.search(searchObject, function (data) {
      res.status(200).json({
        "status": 200,
        "statusText": "OK",
        "message": "All answers retrieved.",
        "data": data
      });
    }, function (err) {
      next(err);
    });
  });
  
  // Create GET/id to return a single answer
  router.get('/:id', function (req, res, next) {
    answerRepo.getById(req.params.id, function (data) {
      if (data) {
        res.status(200).json({
          "status": 200,
          "statusText": "OK",
          "message": "All answers retrieved.",
          "data": data
        });
      }
      else {
        res.status(404).send({
          "status": 404,
          "statusText": "Not Found",
          "message": "The answer '" + req.params.id + "' could not be found.",
          "error": {
            "code": "NOT_FOUND",
            "message": "The answer '" + req.params.id + "' could not be found."
          }
        });
      }
    }, function (err) {
      next(err);
    });
  });
  

// Configure router so all routes are prefixed with /api/v1
app.use('/api/', router);

// Create server to listen on port 3000
var server = app.listen(3000, function () {
  console.log('Node server is running on http://localhost:3000..');
});