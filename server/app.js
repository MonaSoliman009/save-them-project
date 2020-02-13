const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
var router = express.Router();
var bodyparser=require("body-parser");
// var error = require("./middleware/error");
var donatematerial = require("./controllers/donationone")
require("express-async-errors");
var winston = require("winston");
var joi = require("joi");
var hpp = require("hpp");
var ratelimit = require("express-rate-limit");
var bodyParser = require("body-parser");

var helmet = require("helmet");
var fs = require("fs");
var mongosanatize = require("express-mongo-sanitize");
var xss = require("xss-clean");
var charityController = require("./controllers/charity")
const app = express();
const volunteer = require("./controllers/volunteer");

winston.configure({
  transports: [
    new winston.transports.File({
      filename: "logfile.log"
    })
  ]
});
app.use(cors());
app.use(bodyParser.json());
var files_arr = fs.readdirSync(__dirname + "/models");
files_arr.forEach(function (file) {
  require(__dirname + "/models/" + file);
});

var limiter = ratelimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this ip,Please try again in an hour !"
});

// limit number of requests from the same ip address
app.use("/savethem", limiter);
// http security headers
app.use(helmet());
// data sanitization against nosql query injection
app.use(mongosanatize());
// data sanitization against xss
app.use(xss());
// prevent parameter pollution
app.use(hpp());

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "DELETE, HEAD, GET, OPTIONS, POST, PUT"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/charity", charityController);

app.use("/savethem", donatematerial);
app.use("/volunteer", volunteer);
mongoose.Promise = global.Promise;

mongoose.connect(
  "mongodb+srv://mona:123456aa@graduationsite-gnpxx.mongodb.net/test?retryWrites=true&w=majority"
);
mongoose.connection.on("error", err => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(1);
});





app.listen(3000, function () {
  console.log("server running....");
});
