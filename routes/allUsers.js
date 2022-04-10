var express = require('express');
var router = express.Router();
var path = require('path');
const User = require('../models/users');

router.get('/', (req, res) => {
  User.find()
  .then((result) => {
    console.log(result);
    res.send(result);
  })
  .catch((error) => {
      console.log(error)
  })
});

module.exports = router;
