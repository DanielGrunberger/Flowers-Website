var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res) {
  console.log('Hello')
  currentUser = req.query.name;
  if (currentUser != "") {
      console.log('logged in');
  }
  else {
      console.log("Non-authenticated");
  }
  res.sendFile(path.resolve(__dirname+ '/../public/index.html'));
});

module.exports = router;
