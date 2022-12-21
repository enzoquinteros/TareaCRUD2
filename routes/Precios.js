var express = require('express');
var router = express.Router();
var preciosModel = require('../models/preciosModel');

/* GET home page. */
router.get('/', async function(req, res, next) {
  
  var precios = await preciosModel.getPrecios();
  
  res.render('Precios', {
    precios
  });
});

module.exports = router;
