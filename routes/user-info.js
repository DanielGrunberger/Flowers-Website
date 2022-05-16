var express = require('express');
var router = express.Router();
const User = require('../models/users');
var passport = require('passport');


router.get('/', async function(req, res) {       
    currentUser = req.user.username;
    user = await User.getByUsername(currentUser);
    res.send(user);
});

module.exports = router;

