
var express = require('express');
var router = express.Router();
var path = require('path');
var usersDb = require('../views/users.json')
var workerPosition = "Worker";
var managerPosition = "Manager";

function getUserRole(username) {
    let result = usersDb.filter(obj => {
        return obj.user === username 
    })
    if (result.length != 1) {
        return ""
    }
    return result[0].position
}

/* GET users listing. */
router.get('/', function(req, res, next) {
    currentUser = req.query.name;
    role = getUserRole(currentUser);
    if(role == workerPosition || role == managerPosition) {
       res.sendFile(path.resolve(__dirname+ '/../views/authenticated-options.html'));
     return;
    }
    res.sendFile(path.resolve(__dirname+ '/../views/unauthenticated-options.html'));
});

module.exports = router;
