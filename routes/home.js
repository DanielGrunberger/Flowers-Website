var express = require('express');
var router = express.Router();
var path = require('path');

/* GET users listing. */
router.get('/', function(req, res, next) {
    currentUser = req.query.name;
    if (currentUser != "") {
        res.sendFile(path.resolve(__dirname+ '/../views/index.html'));
    }
    else {
        console.log("Non-authenticated")
    }
});

module.exports = router;
