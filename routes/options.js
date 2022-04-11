
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
    return user_query.position;
}

router.get('/', async function(req, res) {
    currentUser = req.query.name;
    role = await getUserRole(currentUser);
    if(role == workerPosition || role == managerPosition) {
       res.sendFile(path.resolve(__dirname+ '/../public/authenticated-options.html'));
        return;
    }
    res.sendFile(path.resolve(__dirname+ '/../public/unauthenticated-options.html'));
});

module.exports = router;
