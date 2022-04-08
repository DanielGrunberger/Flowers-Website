var usersDb = require('../views/users.json')
var express = require('express');
var router = express.Router();
const User = require('../models/users');


router.post('/', function(req, res, next) {
    postData = req.body;
    firstName = postData.firstName;
    lastname = postData.lastName;
    username = postData.username;
    position = postData.position;
    password = postData.password;
    const user = new User({
        name: firstName,
        lastname: lastname,
        position: position,
        user: username,
        password: password,
        status: 'active'
    });

    user.save()
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.log(err)
        });

    res.sendStatus(200);
});

module.exports = router;
