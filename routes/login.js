var express = require('express');
var router = express.Router();
const User = require('../models/users');
var passport = require('passport');


router.post(
    '/',
    passport.authenticate('local', {
      failureRedirect: '/',
      successRedirect: '/',
    }),
    (req, res) => {
      console.log(req.body.username);
    }
  );

  router.get('/',(req, res) => {
     res.render('index.ejs');
    }
  );

  

module.exports = router;
