var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

/* GET update product page. */
router.get('/:id', function(req, res) {

    // var Product = require('../models/product');
    //
    // Product.remove({_id: id}).exec((err, result) => {
    //     console.log(result);
    // });

    pool.connect(function(err, client, done){

        // Handle connection errors
        if(err) {
            console.log(err);
        }

        var id = req.params.id;
        console.log(id);

        // SQL Query > Insert Data
        client.query("DELETE FROM public.sinhvien where id = '"+id+"'" , function (err, result) {
            done();
            if(err){
                return console.log('error running query', err);
            }

            res.redirect('http://localhost:3000');
        });
    });
});

module.exports = router;
