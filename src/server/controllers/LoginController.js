var mongoose = require('mongoose');
var Order = require('../models/OrderModel').OrderModel;
var multer  = require('multer');
var express = require('express');
var path = require('path');
var router = express.Router();
var _isEmpty = require('lodash/isEmpty');
//var Todo = require('../models/TodoModel').TodoModel;

// Set Storage Engine

var storage = multer.diskStorage({
   destination: './public/uploads/',
   filename: function(req, file, cb) {
    // req = request, file = actual file, cb = callback
    cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname));
    //cb(error, filename what ever we want to put);
    //file.originalname is original file name, here we are not using originalname file bcz
    // if someone uploads same file then conflict , overriding or filename.copy(1) .. will hapen
    // to avoid this  we are using  Date.now() timestamp
    //====> file.fieldname  is  whatever u r passing single('orderWhileLogin'); 
    //or u can use file.originalname
   }
})

// router.get('/', function(req, res) {
// 	//res.send('i am yog king');
	
// 	Todo.find(function(err, results) {
// 		if (err) {console.log('err')}
// 		res.header("Cache-Control", "no-cache, no-store, must-revalidate");
// 		res.send({todos:results})
// 	})
// });


// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname + '-' + Date.now()+'.jpg')
//     }
// });
var upload = multer({ 
    storage: storage,
    limits: {fileSize: 1000000}
}).single('orderWhileLogin');

router.post('/', function(req, res)	 {
    var orderData = new Order(req.body);
    console.log('orderData');
    console.dir(req.body);

    // upload(req, res, function(err) {
    //      console.log('req')
        //console.log(req)
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         if(req.file == undefined){
    //             console.log('file undefined');
    //         } else {
    //             console.log('saver img not orderData')
    //             //console.dir(orderData);
    //             res.send('uploads/'+ req.body.file.name);
    //         }
    //     }
    // });
 //    console.log('called');
	
 //    upload.single('file');
  Order.findOne({ email: orderData.email}, function(err, user) {
        console.log('User found ');
        console.log(user)
        // In case the user not found   
        if(err) {
          console.log('THIS IS ERROR RESPONSE')
          res.json(err)
        } else if (!_isEmpty(user) && user.email == orderData.email){
            console.log('User and password is correct')
            console.log(typeof(user))
           // if (user.orderData ) {
              orderData.update(
                { _id: mongoose.Types.ObjectId(user._id) },
                { $set: { 
                  orderData: 
                    {
                    prescriptionText: orderData.prescriptionText,
                    prescriptionImg: ''
                    }
                    
                  
                }},
                function(err) {
                if (err) {console.log('err')} else {console.log('sucess')}
              })
              //}
            res.send({existingUser: true});
          } else {
            console.log("Credentials wrong");
            orderData.save(function(err) {
               if (err) {console.log('err')} else {console.log('sucess')
                  Order.find(function(err, results) {
                     if (err) {console.log('err')}
                     // res.header("Cache-Control", "no-cache, no-store, must-revalidate");
                     res.send({'orderCreated': true , getOrderData: results});
                 })
              }
               
            });
        }             
	});
});

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