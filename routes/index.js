var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var Cart = require('../models/cart');


/** GET home page. */
router.get('/', function(req, res, next) {

  /** Function to display objects */
  Product.find(function(err, docs) {

      var productGroup = [];
      var groupSize = 3;

    /** Pushes objects into array in groups of three and separates them */
      for (var i = 0; i < docs.length; i += groupSize) {
          productGroup.push(docs.slice(i, i + groupSize));
      }
      res.render('shop/index', { title: 'Shopping Cart', products: productGroup });
  });
});

router.get('/add-to-cart/:id', function(req, res, next) {
    var productId = req.params.id;

    /** If exists passes cart to session otherwise passes an empty object*/
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function(err, product) {
       if (err) {
           return res.redirect('/');
       }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/');
    });
});

router.get('/shopping-cart', function(req, res, next) {
   /** Checks if there is a cart in session */
   if (!req.session.cart) {
       return res.render('shop/shopping-cart', {products: null});
   }
    var cart = new Cart(req.session.cart);

    /** Passes products and totalPrice to shopping cart view */
    res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});


module.exports = router;
