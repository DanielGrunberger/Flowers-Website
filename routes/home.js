var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res) {
    currentUser = req.query.name;
    if (currentUser != "") {
        res.sendFile(path.resolve(__dirname+ '/../views/index.html'));
    }
    else {
        console.log("Non-authenticated")
    }
});

module.exports = router;
