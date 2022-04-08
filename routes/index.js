var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('Hello')
  currentUser = req.query.name;
  if (currentUser != "") {
      console.log('logged in');
  }
  else {
      console.log("Non-authenticated");
  }
  res.sendFile(path.resolve(__dirname+ '/../views/index.html'));
});

module.exports = router;
