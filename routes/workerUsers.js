var express = require('express');
var router = express.Router();
var path = require('path');
const User = require('../models/users');

router.get('/', async (req, res) => {
  users = await User.getWorkers();
  res.send(users);
});

module.exports = router;
