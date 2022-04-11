var express = require('express');
var router = express.Router();
var path = require('path');
const Flower = require('../models/flowers');


router.get('/',  async (req, res) => {
  if (Object.keys(req.query).length != 0) {
    try {
      if (req.query.img) {
      flowerName = req.query.img;
      flower =  await Flower.getByName(flowerName);
      res.contentType(flower.image.contentType);
      res.send(flower.image.data);
      }
      else if (req.query.flowerName) {
        flowerName = req.query.flowerName;
        flower =  await Flower.getByName(flowerName);
        flower = {name: flower.name, price: flower.price}
        res.send(flower);
      }
    }
    catch (err) { console.log(`Failed: ${err}`) }
  }
  else {
    try {
      flowers =  await Flower.getAll();
      res.send(flowers);
    }
    catch (err) { console.log(`Failed: ${err}`) }
  }

});

module.exports = router;