var express = require('express');
var router = express.Router();
const User = require('../models/users');
var passport = require('passport');


router.post('/', async function(req, res) {       
    currentUser = req.user.username;
    currentUser = await User.getByUsername(currentUser);
    updatedUser=new User({username : req.body.username, firstname: req.body.firstname, 
        lastname: req.body.lastname, position:currentUser.position, 
    password: currentUser.password, _id: currentUser._id});  
    try {
        await User.updateOne( {username: currentUser.username}, updatedUser);
    }
    catch (err) { console.log(`Failed: ${err}`) }
    res.redirect('/');
});

module.exports = router;

