var express = require("express");
var app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.text());


const OK = 200;
const BAD_REQUEST = 400;
const INTERNAL_SERVER_ERROR = 500;
const DATE_FORMAT = "MM/DD/YYYY hh:mm"

const pointsRoute = require('./routes/points');

app.use('/api/v1/', pointsRoute);

app.get("/*", (req, res, next) => {
  var error = {
    error: "Invalid request. Check api documentation"
  }
  res.status(BAD_REQUEST).send(error);
});



app.listen(3000, () => {
  console.log("Server running on port 3000");
});
