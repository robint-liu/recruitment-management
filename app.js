var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var morgan = require("morgan");
var cookieParser = require("cookie-parser"); //解析cookie
var bodyParser = require("body-parser"); // 解析post请求
var cookieSession = require("cookie-session"); //引入cookie-session组件

var api = require("./routes/api");

var app = express();

// 将名称赋给对应的值，方便调用
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  cookieSession({
    //使用cookie-session中间件
    name: "session",
    secret: "hello world",
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 * 7,
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.use("/api", api);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // console.log("err:", err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
