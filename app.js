const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride =  require('method-override');
const session = require('express-session');
const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware");

//RUTAS
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//MIDDLEWARE APP
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); //DIFERENTE
app.use(methodOverride('_method'));

//SESSION
app.use(session({
	secret: "VVAPE",
	resave: false,
	saveUninitialized: false,
}));
app.use(cookieParser());
app.use(userLoggedMiddleware);

//MIDDLEWARE RUTAS
app.use('/', indexRouter);
app.use('/users', usersRouter);

// ************ DON'T TOUCH FROM HERE ************
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
