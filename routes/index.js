var express = require('express');
var router = express.Router();
var Product = require('../models/product');


/* GET home page. */
router.get('/', function(req, res, next) {

  /*Function to display objects*/
  Product.find(function(err, docs) {

      var productGroup = [];
      var groupSize = 3;

    /*Pushes objects into array in a row of three and separates them*/
      for (var i = 0; i < docs.length; i += groupSize) {
          productGroup.push(docs.slice(i, i + groupSize));
      }
      res.render('shop/index', { title: 'Shopping Cart', products: productGroup });
  });
});

module.exports = router;
