const mongoose = require('mongoose');
const Orders = require('../models/MainSchema').Orders;
const UsersSchema = require('../models/MainSchema').Users;
//const OrdersModel = require('../models/OrdersModel').OrdersModel;
const multer  = require('multer');
const express = require('express');
const path = require('path');
const router = express.Router();
const _isEmpty = require('lodash/isEmpty');
const get = require('lodash/get');
const HttpStatus = require('http-status');
// const mongojs = require('mongojs');
// const db = mongojs('todos', ['orderswhilelogins']);
// const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const fs = require('node-fs');
// const Grid = require('gridfs-stream');
// let fileName;
var upload = multer({ dest: 'uploads/' })
const ErrorConsole = function(err) {
  console.log(err)
}
function jsonEscape(str)  {
    return str.replace(/\n/g, "\\\\n").replace(/\r/g, "\\\\r").replace(/\t/g, "\\\\t");
}


router.post('/', upload.array('file', 12), function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
  console.log('===========================');
  console.log(req.files);
  console.log(req.body);
  const userDetails =  JSON.parse(jsonEscape(req.body.data));
  console.log(userDetails)
  Orders.findOne({user: userDetails.email},function(err, user){
    if(err){
      console.log('err');
      console.log(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: 'unexpected error accessing data'});
      return;
    }else if(user){
      saveOrderData(req, res, userDetails, 'existing');
    } else {
      saveNewUser(req, res, userDetails);
      //res.status(HttpStatus.OK).json({"message":"new user"});
    }
  });
});


function saveNewUser(req, res, userDetails) {
  var newUser = new UsersSchema;
  newUser.user = userDetails.user;
  newUser.email = userDetails.email;
  newUser.phoneNumber = userDetails.phoneNumber;
  newUser.save(function( saveErr, saveUser){
    if (saveErr) {res.status(HttpStatus.OK).json({"message":"err in new user"});}
    saveOrderData(req, res, userDetails, 'new');
    //res.status(HttpStatus.OK).json({"message":"in new user successfully placed"});
  })
}

function saveOrderData(req, res, userDetails, typeUser) {
    var newOrder = new Orders;
    newOrder.user = userDetails.user;

    req.files.forEach(function(file){
      fs.readFile(file.path, 'binary', function (dataErr, data) {

        //fs.writeFile('image_orig.png', original_data, 'binary', function(err) {});
           var base64Image = new Buffer(data, 'binary').toString('base64');
           console.log('base64Image');
           console.log(base64Image);
        if(data) {
          console.log('data');
          console.log(data);
         newOrder.prescriptionImages.push({
            image : data,
            fileName : file.originalname,
            fileType : file.mimetype,
            base64Image: base64Image
          });
        }
      });
      fs.unlink(file.path, function (err) {
            if (err) throw err;
        });
    })
   setTimeout(function(){ 
      console.log('setTimeout::>');
      newOrder.save(function (saveErr, saveOrder) {
      if(saveErr){
        console.log('saveErr::>'+saveErr);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: 'unexpected error accessing data'});
        return;
      }else{
        console.log(saveOrder);
        res.status(HttpStatus.OK).json({"message": typeUser + " user saved &order successfully placed"});
      }
    })
  }, 2000);
}

// const storage = require('multer-gridfs-storage')({
//    url: process.env.MONGOLAB_URI || 'mongodb://localhost/todos',
//    filename: function (req, file, cb) {
//        var datetimestamp = Date.now();
//        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
//        console.log('file.fieldname')
//        console.log(file.fieldname)
//        console.log('file')
//        console.log(file)
//    },
//    /** With gridfs we can store aditional meta-data along with the file */
//    metadata: function(req, file, cb) {
//        cb(null, { originalname: file.originalname });
//    },
//    root: 'ctFiles' //root name for collection to store files into
// });

// router.get('/api', (req, res) => {
//   res.json({
//     message: 'Welcome to the API'
//   });
// });

// router.post('/api/posts', verifyToken, (req, res) => {  
//   jwt.verify(req.token, 'secretkey', (err, authData) => {
//     if(err) {
//       res.sendStatus(403);
//     } else {
//       res.json({
//         message: 'Post created...',
//         authData
//       });
//     }
//   });
// });

// router.post('/api/login', (req, res) => {
//   // Mock user
//   const user = {
//     id: 1, 
//     username: 'brad',
//     email: 'brad@gmail.com'
//   }

//   jwt.sign({user}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
//     res.json({
//       token
//     });
//   });
// });

// // FORMAT OF TOKEN
// // Authorization: Bearer <access_token>

// // Verify Token
// function verifyToken(req, res, next) {
//   // Get auth header value
//   const bearerHeader = req.headers['authorization'];
//   // Check if bearer is undefined
//   if(typeof bearerHeader !== 'undefined') {
//     // Split at the space
//     const bearer = bearerHeader.split(' ');
//     // Get token from array
//     const bearerToken = bearer[1];
//     // Set the token
//     req.token = bearerToken;
//     // Next middleware
//     next();
//   } else {
//     // Forbidden
//     res.sendStatus(403);
//   }

// }

//   /** Setting up storage using multer-gridfs-storage */
// // var storage = GridFsStorage({
// //   gfs : gfs,
  
// // });
// var upload = multer({ //multer settings for single upload
//       storage: storage
//   });


// function updateOrderDataExistingUser(res, orderData) {

//   db.orderswhilelogins.findAndModify({
//       query: { email: orderData.email},
//       update: {
//         $inc: { count: 1 },
//         $push: { 
//           'orderData':
//           {
//             prescriptionText: orderData.prescriptionText,
//             prescriptionImg: fileName,
//             orderDate: '12/7/2018',
//             orderTime: '01:20 PM',
//             orderStatus: {
//               isAccepted: false,
//               isDispached: false,
//               isDelevered: false,
//               isCanceled: false,
//               canceledBy: ''
//             },
//           }
//         }
//       },
//        new: true,
//        upsert: true
//       }, function (err, doc, lastErrorObject) {
//         if (err) {console.log('err in order update findAndModify')}
//          res.send('lastErrorObject');
//        }
//   );
// }

// function saveNewUserData(res, orderData) {
//   var orderDataToSave = new Order(orderData); //schema
//   orderDataToSave.save(function(err) {
//      if (err) {console.log('err')} else {console.log('sucess')
//         Order.find(function(err, results) {
//            if (err) {console.log('err')}
//            // res.header("Cache-Control", "no-cache, no-store, must-revalidate");
//            res.send({'orderCreated': true , getOrderData: results});
//        })
//     }
     
//   });
// }

// function saveUserInModel(userData) {
//   const userDataToSave = new Order(userData);
//   userDataToSave.save(function(err) {
//     if (err) {console.log('err in saveUserInModel')} else {console.log('sucess')}
//   });
// }

// function saveOrderData(orderData) {
//   const orderDataToSave = new OrdersModel(orderData);
//   console.log('orderDataToSave')
//   console.log(orderDataToSave)
//   orderDataToSave.save(function(err){
//     if (err) {console.log('err in saveOrderData')} else {console.log('sucess')}
//   });
// }

// router.post('/', upload.single('file'), function(req, res, next)	 {
//     const orderData = JSON.parse(req.body.data);
//     if (!_isEmpty(req.file)) {
//       fileName = req.file.filename;
//       console.log('fileName');
//       console.log(orderData.orderData);
//       orderData.orderData['prescriptionImg'] = fileName;
//     };
//     const orderDataStore = {
//       Email: orderData.Email,
//       PhoneNumber: orderData.PhoneNumber,
//       prescriptionText: orderData.prescriptionText,
//       prescriptionImg: fileName,
//       isAccepted: orderData.isAccepted,
//       isDispached: orderData.isDispached,
//       isDelevered: orderData.isDelevered,
//       isCanceled: orderData.isCanceled,
//       canceledBy: '',
//       orderDate: orderData.orderDate,
//       orderTime: orderData.orderTime
//     };
//     const userData = {
//       Email: orderData.Email,
//       PhoneNumber: orderData.PhoneNumber
//     }
//     console.log(orderDataStore)
    
//     /// console.log(orderData['orderData']);

//     UsersSchema.findOne({ email: orderData.email}, function(err, user) {
//       if (!err && !_isEmpty(user) && user.email == orderData.email) {
        
//         updateOrderDataExistingUser(res, orderData);
        
//       } else if (!err) {
//         // upload(req,res,function(err){
//         //   console.dir(req);
//         //    console.log('findone-new');
//         //   console.dir(req.file);
//         //     if(err){
//         //          res.json({error_code:1,err_desc:err});
//         //          return;
//         //     }
             
//         //      //res.json({error_code:0,err_desc:null});
//         // });
//         //orderData.orderData['prescriptionImg'] = fileName
//         const userDataToSave = new UsersSchema(userData);
//         userDataToSave.save(function(err) {
//           if (err) {console.log('err in saveUserInModel')} else {console.log('sucess')}
//         });
//         console.log('orderData')
//         //saveUserInModel(userData);
//         //saveOrderData(orderDataStore);
//         saveNewUserData(res, orderData);
       
//       }
//     });
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