var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopping', function(err, db) {
    if (err) {
        console.log('MongoDB connection fail');
        throw err;
    } else {
        database = db;
        console.log('MongoDB connection successful');
    }
});
var products = [
  new Product({
      imagePath : "http://media2.netnews.vn/archive/images/2016/01/07/171109_3.jpg",
      title : "Su34",
      description : "Ông Majumdar nhận xét: 'Quốc gia Bắc Phi này đã sở hữu phiên bản",
      price : "1000",
  })
];

var done = 0;
for (var i =0; i<products.length; i++){
    console.log(products[i].description);
    products[i].save(function (err, result) {
        done++;
        console.log(done);
        if (done === products.length) {
            exit();
        }
    });
};

function exit(){
    mongoose.disconnect();
}
