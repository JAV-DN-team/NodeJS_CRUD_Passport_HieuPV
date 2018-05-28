var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET add product page. */
router.get('/', function(req, res, next) {
    if (req.isAuthenticated() && 'ADMIN' == req.session.passport.user.name_role){
        console.log(req.session.passport.user)
        res.render('shop/addProduct');
    } else {
        res.send('ban da khong co quyen')
    }

});

/* POST add product page. */
router.post('/', urlencodedParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    if (req.isAuthenticated()){
        pool.connect(function(err, client, done){
            // Handle connection errors
            if(err) {
                console.log(err);
            }

            var txtTitle = req.body.txtTitle;
            var txtImagePath = req.body.txtImagePath;
            var txtDescription = req.body.txtDescription;
            var txtPrice = req.body.txtPrice;
            var txtMade = req.body.txtMade;
            console.log("Title " + txtImagePath);
            // SQL Query > Insert Data
            client.query("INSERT INTO public.sinhvien(image_path, title, description, price, made) VALUES ('"+txtImagePath+"', '"+txtTitle+"', '"+txtDescription+"', '"+txtPrice+"', '"+txtMade+"')", function (err, result) {
                done();
                if(err){
                    return console.log('error running query', err);
                }

                res.redirect('../');
            });
        });
    } else {
        res.send('ban da khong co quyen')
    }

});

module.exports = router;
