var express = require('express');
var router = express.Router();
const Flower = require('../models/flowers');
const multer = require('multer');
var path = require('path');
var fs = require('fs');
const User = require('../models/users');
var providerPosition = "Provider";
var managerPosition = "Manager";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })

router.post('/',   upload.single('img'), async (req, res) => {
    postData = req.body;
    console.log(postData);
    console.log(req.file.filename);
    img =  {
      data: fs.readFileSync(path.join(__dirname + '/../uploads/' + req.file.filename)),
      contentType: 'image/png'
  };

    flower = {
        name: postData.name,
        price: postData.price,
        image: img
    }
    try {
        await Flower.add(flower);
    }
    catch (err) { console.log(`Failed: ${err}`) }
});

router.get('/', async function(req, res) {
    currentUser = req.user.username;
    role = await getUserRole(currentUser);
    if (role == managerPosition || role == providerPosition) {
    res.sendFile(path.resolve(__dirname+ '/../views/add-flower..ejs'));
    }
    else{
      res.render('../views/forbidden..ejs');
    }
});

async function getUserRole(username) {
  user_query = await User.getByUsername(username);
  if (!user_query) {
      return ""
  }
  return user_query.position;
}
module.exports = router;