var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var welcomeRouter = require("./routes/welcome");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/welcome", welcomeRouter);

var repos = [
  { name: "express", url: "https://github.com/expressjs/express" },
  { name: "stylus", url: "https://github.com/learnboost/stylus" },
  { name: "cluster", url: "https://github.com/learnboost/cluster" },
];

// example: http://localhost:3000/repos/
app.get("/repos", function (req, res, next) {
  res.send(repos);
});

// app.get('/myform', function(req, res){  
//     var myName = req.query.name;
//     res.send('Your Text:' + myName);  
// });  

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
