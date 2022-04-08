var express = require('express');
var router = express.Router();
var usersDb = require('../views/users.json')

function checkCreds(user, password) {
    let result = usersDb.filter(obj => {
        return obj.user === user && obj.password == password
    })
    if (result.length != 1) {
        return false
    }
    return true
}


router.post('/', function(req, res, next) {
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
