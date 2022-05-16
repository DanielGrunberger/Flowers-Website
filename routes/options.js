
var express = require('express');
var ap = require('../app');
var router = express.Router();
var path = require('path');
const User = require('../models/users');
var workerPosition = "Worker";
var managerPosition = "Manager";

async function getUserRole(username) {
  
    user_query = await User.getByUsername(username);
    if (!user_query) {
        return ""
    }
    return user_query.position;
}

router.get('/', async function(req, res) {
    currentUser = req.user.username;
    role = await getUserRole(currentUser);
    console.log(role);
    if(role == workerPosition || role == managerPosition) {
        res.render('authenticated-options.ejs');
        return;
    }
    res.render('unauthenticated-options..ejs');
});

module.exports = router;
