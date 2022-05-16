var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res) {
    currentUser = req.user;
    if (currentUser != "") {
        res.render('index.ejs');
    }
    else {
        console.log("Non-authenticated")
    }
});

module.exports = router;
