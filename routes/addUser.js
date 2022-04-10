var usersDb = require('../views/users.json')
var express = require('express');
var router = express.Router();
const User = require('../models/users');


router.post('/', function(req, res) {
    postData = req.body;
    action = postData.action;

    const user = new User({
        firstname: postData.name,
        lastname: postData.lastname,
        position:postData.position,
        username: postData.user,
        password:  postData.password,
        status: 'active'
    });
    if (action == 'add') {
        addUser(user);
    }
    else if (action == 'edit') {
        editUser(user);
    }
    else if (action == 'delete') {
        deleteUser(user);
    }
    else {
        res.send(400);
    }
    res.send(200);
});

async function addUser(user) {
    const existUsername = await User.findOne({ username: user.username});
    if (!existUsername) {
        user.save()
            .then((result) => {
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
      }
};

function editUser(user){
    user_query = {username: user.username};
    newUser = user;
    User.updateOne(user_query, newUser)
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });
};

function  deleteUser(user){
    console.log('user.username:',user.username);
    User.deleteOne({
        username: user.username
    })
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });
};

module.exports = router;
