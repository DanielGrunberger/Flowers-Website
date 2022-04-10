var usersDb = require('../views/users.json')
var express = require('express');
var router = express.Router();
const User = require('../models/users');


router.post('/', async function(req, res) {
    postData = req.body;
    action = postData.action;

    var user = {
        firstname: postData.name,
        lastname: postData.lastname,
        position:postData.position,
        username: postData.user,
        password:  postData.password,
        status: 'active'
    };
    if (action == 'add') {
        await createUser(user);
    }
    else if (action == 'edit') {
        editUser(user);
    }
    else if (action == 'delete') {
        deleteUser(user);
    }
    else {
        res.sendStatus(400);
    }
    res.sendStatus(200);
});

async function createUser(user) {
    try {
        await User.add(user);
    }
    catch (err) { console.log(`Failed: ${err}`) }
};

async function editUser(user){
    try {
        await User.edit(user);
    }
    catch (err) { console.log(`Failed: ${err}`) }
};

async function  deleteUser(user){
   try {
       await User.delete(user);
   }
   catch (err) { console.log(`Failed: ${err}`) }

};

module.exports = router;
