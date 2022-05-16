var express = require('express');
var router = express.Router();
const User = require('../models/users');
var passport = require('passport');


router.get('/', function(req, res) {       
    res.render('profile.ejs');
});

module.exports = router;
