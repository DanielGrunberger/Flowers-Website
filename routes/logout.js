var express = require('express');
var router = express.Router();
const User = require('../models/users');
var passport = require('passport');


router.get('/', function(req, res) {
    req.logout();
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.redirect(req.get('referer'));
    })
});

  

module.exports = router;
