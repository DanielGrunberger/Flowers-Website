var createError = require('http-errors'); // middleware module of express for http errors
var express = require('express');
var path = require('path'); 
var cookieParser = require('cookie-parser'); // middleware module of express for cookies
var logger = require('morgan');  // middleware module of express for http logs
const mongoose = require("mongoose");
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var app = express();
var ejs = require('ejs');
const User = require('./models/users');
var favicon = require('serve-favicon');

app.use(favicon(path.join(__dirname, 'public', 'flower.ico')))
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect('mongodb://localhost/flowers-website');



app.use(
  session({
    secret: "secret123",
    resave: false,
    saveUninitialized: true,
  })
  );
app.use(passport.initialize());
app.use(passport.session()); 
app.use(function(req, res, next){
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var indexRouter = require('./routes/index');
var homeRouter = require('./routes/home');
var catalogRouter = require('./routes/catalog');
var contactRouter = require('./routes/contact');
var aboutRouter = require('./routes/about');
var usersManagementRouter = require('./routes/usersManagement');
var optionsRouter = require('./routes/options');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var registerRouter = require('./routes/register');
var postUserRouter = require('./routes/postUser');
var allUsersRouter = require('./routes/allUsers');
var workerUsersRouter= require('./routes/workerUsers');
var errorRouter = require('./routes/error');
var allFlowersRouter = require('./routes/allFlowers');
var addFlowerRouter = require('./routes/addFlower');
var errorRouter = require('./routes/error');
var profileRouter = require('./routes/profile');
var userInfoRouter = require('./routes/user-info');
var updateUserRouter = require('./routes/update-user');







app.use('/', indexRouter);
app.use('/home', homeRouter);
app.use('/catalog', catalogRouter);
app.use('/contact', contactRouter);
app.use('/about', aboutRouter);
app.use('/users-management', isLoggedIn, usersManagementRouter);
app.use('/options', optionsRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/post-user', isLoggedIn, postUserRouter);
app.use('/all-users', isLoggedIn, allUsersRouter);
app.use('/add-flower', isLoggedIn, addFlowerRouter);
app.use('/flowers', isLoggedIn, allFlowersRouter);
app.use('/worker-users', isLoggedIn, workerUsersRouter);
app.use('/profile', isLoggedIn, profileRouter);
app.use('/user-info', isLoggedIn, userInfoRouter);
app.use('/logout', isLoggedIn, logoutRouter);
app.use('/update-user', isLoggedIn, updateUserRouter);

function isLoggedIn(req,res,next) {
  if(req.isAuthenticated()){
      return next();
  }
  res.redirect("/login");
}

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  console.log(err.message)
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('/error');
});

module.exports = app;

app.listen(8080, ()=>{console.log('listening in 8080...');});