var express = require('express');
var router = express.Router();
// var Product = require('../models/product');

/* GET home page. */
router.get('/', function(req, res, next) {
  // Product.find(function (err, docs){
  //   var productChuck = [];
  //   var chuckSize = 3;
  //   for (var i = 0; i < docs.length; i+=chuckSize){
  //     productChuck.push(docs.slice(i, i+chuckSize));
  //   }
  //
  //   var userName = req.session.userName;
  //   res.render('shop/index', { title: 'Online shop', products: productChuck, userName: userName });
  // });
    pool.connect(function(err, client, done){
        // Handle connection errors
        if(err) {
            console.log(err);
        }
        // SQL Query > Insert Data
        client.query('SELECT * FROM public.sinhvien', function (err, result) {
            done();
            if(err){
                return console.log('error running query', err);
            }
            console.log(result.rows.length);
            var productChuck = [];
            var chuckSize = 3;
            for (var i = 0; i < result.rows.length; i+=chuckSize){
                productChuck.push(result.rows.slice(i, i+chuckSize));
            }
            var userName;
            if (req.isAuthenticated()){
                console.log(req.session.passport.user.username)
                userName = req.session.passport.user.username;
            }
            // var userName = req.session.passport.user;
            res.render('shop/index', { title: 'Online shop', products: productChuck, userName: userName });
        });
    });
});

/* GET home page. */
router.get('/addCart/:title', function(req, res, next) {
    console.log(req.params.title);
    if (!req.session.title) {
        var arr = [];
    }
    var title = req.params.title;
    arr = [
        new Product({
            title : title,
        })
    ];

    // count the views
    req.session.title = arr;

   console.log('Session ' + req.session.title );
   res.redirect('../');
});

module.exports = router;
