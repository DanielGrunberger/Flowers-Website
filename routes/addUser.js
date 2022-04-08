var usersDb = require('../views/users.json')
var express = require('express');
var router = express.Router();
var path = require('path');


function addUser(my_firstname, my_lastname, my_user, position, password) {
    newUser = {
        firstname: my_firstname,
        lastname: my_lastname,
        user: my_user,
        position: position,
        password: password,
        status: "active",
    };
    usersDb.push(newUser);
    fs.writeFileSync("../views/users.json", JSON.stringify(usersDb));
}



/* GET users listing. */
router.get('/', function(req, res, next) {
    postData = req.body;
    my_firstname = postData.firstName;
    my_lastname = postData.lastName;
    my_user = postData.username;
    position = postData.position;
    password = postData.password;

    addUser(my_firstname, my_lastname, my_user, position, password)
    res.sendStatus(200);
});

module.exports = router;
