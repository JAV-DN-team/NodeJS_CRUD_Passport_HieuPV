var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET update product page. */
router.get('/:id', function(req, res, next) {

    // var Product = require('../models/product');

    // Product.findOne({"_id": id}, function (err, result) {
    //     if (err) throw err;
    //     res.render('shop/updateProduct', { title: 'Online shop', product: result});
    // })

    if (req.isAuthenticated() && 'ADMIN' == req.session.passport.user.name_role){
        pool.connect(function(err, client, done){

            // Handle connection errors
            if(err) {
                console.log(err);
            }

            var id = req.params.id;
            console.log(id);

            // SQL Query > Insert Data
            client.query("SELECT * FROM public.sinhvien where id = '"+id+"'" , function (err, result) {
                done();
                if(err){
                    return console.log('error running query', err);
                }

                console.log('Update: '+result.rows[0].title);
                // var userName = req.session.userName;
                res.render('shop/updateProduct', { title: 'Online shop', product: result.rows[0]});
            });
        });
    } else {
        res.redirect('/product/login');
    }

});

/* POST update product page. */
router.post('/', urlencodedParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);

    // var Product = require('../models/product');
    // Product.update({_id: id}, {title: txtTitle, imagePath: txtImagePath, description : txtDescription, price : txtPrice, made : txtMade}).exec((err, result) => {
    //     console.log(result);
    // });

    pool.connect(function(err, client, done){

        // Handle connection errors
        if(err) {
            console.log(err);
        }

        var txtTitle = req.body.txtTitle;
        var txtImage_path = req.body.txtImagePath;
        var txtDescription = req.body.txtDescription;
        var txtPrice = req.body.txtPrice;
        var txtMade = req.body.txtMade;
        var id = req.body.id;
        console.log("ID UPDATE"+ id);

        // SQL Query > Insert Data
        client.query("UPDATE public.sinhvien SET image_path='"+txtImage_path+"', title='"+txtTitle+"', description='"+txtDescription+"', price='"+txtPrice+"', made='"+txtMade+"' WHERE id = '"+id+"'" , function (err, result) {
            done();
            if(err){
                return console.log('error running query', err);
            }

            // console.log('Update: '+result.rows[0].title);
            // var userName = req.session.userName;
            res.redirect('../');
        });
    });


});
module.exports = router;
