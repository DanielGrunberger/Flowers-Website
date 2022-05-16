var express = require('express');
var router = express.Router();
const User = require('../models/users');
var passport = require('passport');


router.post('/', function(req, res) {       
    Users=new User({username : req.body.username, email: req.body.email,firstname: req.body.firstname, 
        lastname: req.body.lastname, position:'Worker'});   
          User.register(Users, req.body.password, function(err, user) { 
            if (err) { 
              res.json({success:false, message:"Your account could not be saved. Error: ", err}) 
            }else{ 
                res.render('index.ejs');
            } 
          }); 
});

module.exports = router;
