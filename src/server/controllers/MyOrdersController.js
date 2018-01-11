var mongoose = require('mongoose');
//var MyOrders = require('../models/MyOrdersModel').MyOrdersModel;
var express = require('express');
var router = express.Router();
var MyOrders = require('../models/LoginOrderModel').LoginOrderModel;
var mongojs = require('mongojs');
var db = mongojs('todos', ['orderswhilelogins']);

router.get('/:id', function(req, res) {
    //res.send('i am yog king');
    console.log(req.params.id);
    getOrdersByEmail(req.params.id, req, res);
    
});

function getOrdersByEmail(id, req, res) {
    MyOrders.findOne({ email: id}, function(err, results) {
        if (err) {console.log('err')}
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        res.send({myOrders:results})
    })
}


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
//     var id = id;
//     console.log('yop');
//     Todo.update({ _id: mongoose.Types.ObjectId(id) }, {
//         $set: { task: req.body.task }

//     }, function(err) {
//         if (err) { console.log(err); }
//         res.send('ToDo updated');
//     });
//     console.log('nop');
// });
// [
//   myOrders:  {
//         "_id": "04",
//         "name": "test service 4",
//         "id": "04",
//         "version": "0.0.1",
//         "title": "testing",
//         "description": "test",
//         "protocol": "test",
//         "orderData": [
//             {
//                 "_id": "99",
//                 "oName": "test op 52222222222",
//                 "sid": "04",
//                 "name": "test op 52222222222",
//                 "oid": "99",
//                 "description": "testing",
//                 "returntype": "test",
//                 "orderStatus": [
//                     {
//                         "oName": "Param1",
//                         "name": "Param1",
//                         "pid": "011",
//                         "type": "582",
//                         "description": "testing",
//                         "value": ""
//                     }
                    
//                 ]
//             }
//         ]
// db.collection.update(
//     {
//         "_id" : myOrdersId, 
//         "orderData.orderStatus._id": orderDataId
//     }, 
//     {
//         "$set": { 
//             "orderData.[0].orderStatus.$.canceledBy": "user",
//         }
//     }
// )

router.post('/:myOrdersId/:orderDataId/:orderStatusId', function(req, res) {
    console.log(req)
    var email = req.params.myOrdersId
    var myOrdersId = req.params.myOrdersId;
    var orderDataId = req.params.orderDataId;
    var orderStatusId = req.params.orderStatusId;
    console.log(typeof(myOrdersId))
    console.log(myOrdersId)
    var date = new Date();
    var dateToLocal = date.toLocaleString();
    // db.orderswhilelogins.update( 
    // { orderData: {$elemMatch: { _id: orderDataId}} },
    // { 
    //     $set: { 
    //     'orderData.$.orderStatus.canceledlBy': 'user', 
    //     'orderData.$.orderStatus.isCanceledk': true, 
    //     }
    // }, function (err, doc, lastErrorObject) {
    //     if (err) {
    //         console.log(err)
    //     }
    // })

    //db.orderswhilelogins.update({_id : mongoose.Types.ObjectId(myOrdersId)},{$inc:{"orderData.$.canceledBy":"user","orderData.$.orderStatus.isCanceled": true}})

    db.orderswhilelogins.update({
        'email': email,
        'orderData._id': mongojs.ObjectId(orderDataId),
        'orderData.orderStatus._id': mongojs.ObjectId(orderStatusId),
    }, {
        $set: { 
            'orderData.$.orderStatus.0.canceledBy': 'user',
            'orderData.$.orderStatus.0.isCanceled': true,
            'orderData.$.orderStatus.0.canceledTime': dateToLocal,
        }
    },
    function(err, products) {
        if (err) {
            console.log(err)
        } else {
             getOrdersByEmail(email, req, res);
        }
        
    })

    // db.orderswhilelogins.update({_id : mongoose.Types.ObjectId(myOrdersId)},
    //     {
    //         "$set": { 
    //             "orderData.$.orderStatus.canceledBy": "user",
    //             "orderData.$.orderStatus.isCanceled": true
    //         }

    //     },
    //     {multi : true}, function (err, doc, lastErrorObject) {
    //           if (err) {console.log('err in order update findAndModify')}
    //            res.send(lastErrorObject);
    //          }
    // )
    // db.orderswhilelogins.findAndModify({
    //     query: { _id: mongoose.Types.ObjectId(orderStatusId) },
    //     update: {
    //       $set: { 
    //         "orderData.$.orderStatus.isCanceled": true,
    //         "orderData.$.orderStatus.canceledBy": "user",
    //         }
    //       },
    //     new: true
    //     }, function (err, doc, lastErrorObject) {
    //       if (err) {console.log('err in order update findAndModify')}
    //        res.send(lastErrorObject);
    //      }
    // );




    // console.log('del')
    // var id = req.params.id;
    // console.log(typeof(id))
    // console.log(id)
    // MyOrders.remove({ _id: mongoose.Types.ObjectId(id) }, function(err) {
    //     if (err) { console.log(err); }

    //     res.send('order deleted');
    // });
    //
});

module.exports = router;