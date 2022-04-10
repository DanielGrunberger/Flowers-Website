var express = require('express');
var router = express.Router();
const Flower = require('../models/flowers');
const multer = require('multer');
var path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })

  var upload = multer({ storage: storage })

router.post('/',  async (req, res) => {
    var img = fs.readFileSync(req.file.path);
    postData = req.body;
    var encode_img = img.toString('base64');
    var final_img = {
        contentType:req.file.mimetype,
        image:new Buffer(encode_img,'base64')
    };
    flower = {
        name: postData.name,
        price: postData.price,
        image: final_img
    }
    try {
        await Flower.add(user);
    }
    catch (err) { console.log(`Failed: ${err}`) }
});

router.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname+ '/../views/add-flower.html'));
});

module.exports = router;