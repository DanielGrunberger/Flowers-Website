var express = require('express');
var router = express.Router();
const User = require('../models/users');

async function checkCreds(username, password) {
    user_query = await User.checkCredentials(username,password);
    if (!user_query) {
        return false
    }
    return true
}


router.post('/', function(req, res) {
    var postData = req.body;
    if (checkCreds(postData.username, postData.password)) {
        LoggedIn = true;
        res.sendStatus(200);
    }
    else {
        res.sendStatus(401);
    }
});

module.exports = router;
