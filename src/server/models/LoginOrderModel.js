// var mongoose = require('mongoose');
// mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/todos');
// //mongoose.Promise = global.Promise // <--
// mongoose.connection.on('connected', function () {

//     console.log('Mongoose connected OrderModel');
// });

// var Schema = mongoose.Schema;
// // var data = new Schema({  
// // 	email: String,
// //     phoneNumber: String,
// //     Email: String,
// //     PhoneNumber: String,
// //     orderData:[{
// //     	prescriptionText: String,
// //     	prescriptionImg: String,
// //     	orderDate: String,
// //     	orderTime: String,
// //     	orderStatus: [{
// //     	  isAccepted: Boolean,
// //     	  isDispached: Boolean,
// //     	  isDelevered: Boolean,
// //     	  isCanceled: Boolean,
// //     	  canceledBy: String
// //     	}]

// //     }
// //     ],
// //     prescriptionText: String,
// //     data: { data: Buffer, contentType: String }
// //     });
// // var LoginOrderModel = mongoose.model('ordersWhileLogin', data);

// var ImageSchema = new mongoose.Schema({
//     image : Buffer,
//     fileType:{type:String},
//     fileName:{type:String}
// });

// var OrderSchema = new mongoose.Schema({
//     //user:{type: Schema.Types.ObjectId, ref: 'User'},
//     email: {type: String},
//     user: {type: String},
//     phoneNumber: { type: String },
//     OrderDate : { type: Date, default: Date.now },
//     images: [ImageSchema]
// });



// var Orders = mongoose.model('Orders', OrderSchema);


// // var OrderModel = mongoose.model('OrderModel', {
// //     email: String,
// //     phoneNumber: Boolean,
// //     prescription: String
// // });

// module.exports.LoginOrderModel = LoginOrderModel;