var express = require('express');
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
    console.log(user_query);
    return user_query.position;
}


/* GET users listing. */
router.get('/', async function(req, res) {
    currentUser = req.user.username;
    role = await getUserRole(currentUser);
    if (role == workerPosition){
        res.render('users-management-worker.ejs');
        return;
     } else if (role == managerPosition) {
        res.render('users-management-manager.ejs');
        return;
    }
});

module.exports = router;

