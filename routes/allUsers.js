var express = require('express');
var router = express.Router();
var path = require('path');
const User = require('../models/users');

router.get('/',  async (req, res) => {
  try {
    users =  await User.getAll();
    res.send(users);
  }
  catch (err) { console.log(`Failed: ${err}`) }
});

module.exports = router;
