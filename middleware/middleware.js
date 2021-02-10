var express = require("express");
var app = express();

const OK = 200;
const BAD_REQUEST = 400;
const INTERNAL_SERVER_ERROR = 500;


var middleware = function(req, res, next) {
  var contype = req.headers['content-type'];
    if (!contype || contype.indexOf('application/json') !== 0 ){
      var error = {
        error: "Invalid content-type. Please use Content-Type:application/json"
      }
      return res.status(BAD_REQUEST).send(error);
    }
  if (req.body == null || JSON.stringify(req.body) == '{}') {
    var error = {
      error: "Body of request must not be empty"
    }
    res.status(BAD_REQUEST).send(error);
  } else if (req.body.name == null || req.body.points == null || req.body.date == null) {
    var error = {
      error: "Body parameters of request must be provided"
    }
    res.status(BAD_REQUEST).send(error);
  } else if (req.body.name == '') {
    var error = {
      error: "name parameters of request body must not be empty"
    }
    res.status(BAD_REQUEST).send(error);
  } else if (req.body.points == '') {
    var error = {
      error: "points parameters of request body must not be empty"
    }
    res.status(BAD_REQUEST).send(error);
  } else if (req.body.date == '') {
    var error = {
      error: "date parameters of request body must not be empty"
    }
    res.status(BAD_REQUEST).send(error);
  } else
    next();
}

module.exports.middleware = middleware;
