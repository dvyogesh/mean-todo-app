var mongoose = require('mongoose');
var Order = require('../models/LoginOrderModel').LoginOrderModel;
var multer  = require('multer');
var express = require('express');
var path = require('path');
var router = express.Router();
var _isEmpty = require('lodash/isEmpty');
var mongojs = require('mongojs');
var db = mongojs('todos', ['orderswhilelogins']);
var jwt = require('jsonwebtoken');

//var Todo = require('../models/TodoModel').TodoModel;

// Set Storage Engine
router.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the API'
  });
});

router.post('/api/posts', verifyToken, (req, res) => {  
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post created...',
        authData
      });
    }
  });
});

router.post('/api/login', (req, res) => {
  // Mock user
  const user = {
    id: 1, 
    username: 'brad',
    email: 'brad@gmail.com'
  }

  jwt.sign({user}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
    res.json({
      token
    });
  });
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }

}
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

function updateOrderDataExistingUser(res, orderData) {
  db.orderswhilelogins.findAndModify({
      query: { email: orderData.email},
      update: {
        $push: { 
          'orderData':
          {
            prescriptionText: orderData.prescriptionText,
            prescriptionImg: '',
            orderDate: '12/7/2018',
            orderTime: '01:20 PM',
            orderStatus: {
              isAccepted: false,
              isDispached: false,
              isDelevered: false,
              isCanceled: false,
              canceledBy: ''
            }
          }
        }
      },
       new: true
      }, function (err, doc, lastErrorObject) {
        if (err) {console.log('err in order update findAndModify')}
         res.send('lastErrorObject');
       }
  );
}

function saveNewUserData(res, orderData) {
  var orderDataToSave = new Order(orderData);
  orderDataToSave.save(function(err) {
     if (err) {console.log('err')} else {console.log('sucess')
        Order.find(function(err, results) {
           if (err) {console.log('err')}
           // res.header("Cache-Control", "no-cache, no-store, must-revalidate");
           res.send({'orderCreated': true , getOrderData: results});
       })
    }
     
  });
}

router.post('/', function(req, res)	 {
    var orderData = req.body;
    console.log('orderData');
    console.dir(req.body);

    Order.findOne({ email: orderData.email}, function(err, user) {
      if (!err && !_isEmpty(user) && user.email == orderData.email) {
        updateOrderDataExistingUser(res, orderData);
      } else if (!err) {
        saveNewUserData(res, orderData);
      }
    });





 //  Order.findOne({ email: orderData.email}, function(err, user) {
 //        console.log('User found ');
 //        console.log(user)
 //        // In case the user not found   
 //        if(err) {
 //          console.log('THIS IS ERROR RESPONSE')
 //          res.json(err)
 //        } else if (!_isEmpty(user) && user.email == orderData.email){
 //            console.log('User and password is correct')
 //            console.log(typeof(user))
 //           // if (user.orderData ) {
 //              orderData.update(
 //                { _id: mongoose.Types.ObjectId(user._id) },
 //                { $set: { 
 //                  orderData: 
 //                    {
 //                    prescriptionText: orderData.prescriptionText,
 //                    prescriptionImg: ''
 //                    }
                  
 //                }},
 //                function(err) {
 //                if (err) {console.log('err')} else {console.log('sucess')}
 //              })
 //              //}
 //            res.send({existingUser: true});
 //          } else {
 //            console.log("Credentials wrong");
 //            orderData.save(function(err) {
 //               if (err) {console.log('err')} else {console.log('sucess')
 //                  Order.find(function(err, results) {
 //                     if (err) {console.log('err')}
 //                     // res.header("Cache-Control", "no-cache, no-store, must-revalidate");
 //                     res.send({'orderCreated': true , getOrderData: results});
 //                 })
 //              }
               
 //            });
 //        }             
	// });
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