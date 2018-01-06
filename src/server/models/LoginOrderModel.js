var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/todos');
//mongoose.Promise = global.Promise // <--
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected OrderModel');
});

var Schema = mongoose.Schema;
var data = new Schema({  
	email: String,
    phoneNumber: String,
    orderData:[{
    	prescriptionText: String,
    	prescriptionImg: String,
    	orderDate: String,
    	orderTime: String,
    	orderStatus: [{
    	  isAccepted: Boolean,
    	  isDispached: Boolean,
    	  isDelevered: Boolean,
    	  isCanceled: Boolean,
    	  canceledBy: String
    	}]

    }
    ],
    prescriptionText: String,
    file: { data: Buffer, contentType: String }
    });
var LoginOrderModel = mongoose.model('ordersWhileLogin', data);




// var OrderModel = mongoose.model('OrderModel', {
//     email: String,
//     phoneNumber: Boolean,
//     prescription: String
// });

module.exports.LoginOrderModel = LoginOrderModel;