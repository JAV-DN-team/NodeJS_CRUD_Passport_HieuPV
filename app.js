import permit from "./permission"; // middleware for checking if user's role is permitted to make request

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressHbs =  require('express-handlebars');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var fs = require('fs');
const bcrypt= require('bcrypt')

var indexRouter = require('./routes/index');
var addProductRouter = require('./routes/addProduct');
var loginProductRouter = require('./routes/login');
var logoutProductRouter = require('./routes/logout');
var updateProductRouter = require('./routes/updateProduct');
var deleteProductRouter = require('./routes/deleteProduct');
var usersRouter = require('./routes/users');

var app = express();

var pg = require('pg');
var config = {
    user: 'postgres',
    database: 'Shopping',
    password: '123',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000,
}
pool = new pg.Pool(config);

app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(expressSession({secret: 'max',
//     saveUninitialized: true,
//     resave:false,
//     cookie:{maxAge: 1000*60*60*24}
// }));

app.use(expressSession({secret: 'keyboard cat'}))

app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
// app.use(passport.authenticate('remember-me'));
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/product/add', addProductRouter);
app.use('/product/update', updateProductRouter);
app.use('/product/delete', deleteProductRouter);
app.use('/product/login', loginProductRouter);
app.use('/product/logout', logoutProductRouter);

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
