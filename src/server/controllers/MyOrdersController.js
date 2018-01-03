var mongoose = require('mongoose');
//var MyOrders = require('../models/MyOrdersModel').MyOrdersModel;
var express = require('express');
var router = express.Router();
var MyOrders = require('../models/OrderModel').OrderModel;

router.get('/', function(req, res) {
    //res.send('i am yog king');
    
    MyOrders.find(function(err, results) {
        if (err) {console.log('err')}
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        res.send({myOrders:results})
    })
});


// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname+ '-' + Date.now()+'.jpg')
//     }
// });
// var upload = multer({ storage: storage });

// router.post('/', function(req, res)	 {
//     console.log('called');
// 	var orderData = new Order(req.body);
//     console.log('orderData')
//     console.dir(orderData);
//     upload.single('file');
// 	orderData.save(function(err) {
// 	   if (err) {console.log('err')} else {console.log('sucess')}
// 	   res.send('task created');
// 	});
// });

// router.put('/:id', function(req, res) {
//     var id = req.params.id;
//     console.log('yop');
//     Todo.update({ _id: mongoose.Types.ObjectId(id) }, {
//         $set: { task: req.body.task }

//     }, function(err) {
//         if (err) { console.log(err); }
//         res.send('ToDo updated');
//     });
//     console.log('nop');
// });


// router.delete('/:id', function(req, res) {
//     var id = req.params.id;
//     //console.log('del')
//     Todo.remove({ _id: mongoose.Types.ObjectId(id) }, function(err) {
//         if (err) { console.log(err); }

//         res.send('ToDo deleted');
//     });
//     //
// });

module.exports = router;