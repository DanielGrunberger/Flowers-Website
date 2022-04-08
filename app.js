var createError = require('http-errors'); // middleware module of express for http errors
var express = require('express');
var path = require('path'); 
var cookieParser = require('cookie-parser'); // middleware module of express for cookies
var logger = require('morgan');  // middleware module of express for http logs

var usersDb = require('./views/users.json')
var flowersDb = require('./views/flowers.json')
const fs = require('fs')
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var LoggedIn  = false;
var workerPosition = "Worker";
var managerPosition = "Manager";

var indexRouter = require('./routes/index');
var homeRouter = require('./routes/home');
var catalogRouter = require('./routes/catalog');
var contactRouter = require('./routes/contact');
var aboutRouter = require('./routes/about');
var usersManagementRouter = require('./routes/usersManagement');
var optionsRouter = require('./routes/options');
var loginRouter = require('./routes/login');
var addUserRouter = require('./routes/addUser');
var addUserRouter = require('./routes/error');

var app = express();

// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '/views/')));
app.engine('html', require('ejs').renderFile);

app.use('/', indexRouter);
app.use('/home', homeRouter);
app.use('/catalog', catalogRouter);
app.use('/contact', contactRouter);
app.use('/about', aboutRouter);
app.use('/users-management', usersManagementRouter);
app.use('/options', optionsRouter);
app.use('/login', loginRouter);
app.use('/add-user', addUserRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  console.log(err.message)
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error.html');
});

module.exports = app;

app.listen(8080, ()=>{console.log('listening in 8080...');});