const express = require("express");
const router = express.Router();
var pointsDB = require('./../database/pointsDB');
var middleware = require('./../middleware/middleware');

//status code
const OK = 200;
const BAD_REQUEST = 400;
const INTERNAL_SERVER_ERROR = 500;
const DATE_FORMAT = "MM/DD/YYYY hh:mm"

//get route
router.get("/points", (req, res, next) => {
  res.status(OK).send(pointsDB.getBalance());
});

//post route
router.post("/points",middleware.middleware, (req, res, next) => {

  const date = new Date(req.body.date);

  if (date instanceof Date && !isNaN(date)) {
    pointsDB.addBalance(req.body.name, req.body.points, date);
    pointsDB.addPoints(req.body.name, req.body.points, date);
      var result = {
        result: "Record Added"
      }
       res.send(result);
  } else {
    var result = {
      error: "Invalid date format. Date must be in " + DATE_FORMAT
    }
    res.status(BAD_REQUEST).send(result);
  }
});

router.delete("/points", (req, res, next) => {
  if (req.body.points == null) {
    res.status(BAD_REQUEST).send("");
  }
  res.status(OK).send(pointsDB.deletePoints(req.body.points));
});

module.exports = router;
