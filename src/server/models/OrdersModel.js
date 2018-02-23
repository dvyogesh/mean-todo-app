var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/todos');
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected OrdersModel');
});

var Schema = mongoose.Schema;
var data = new Schema({  
	Name: String,
	Email: String,
	PhoneNumber: String,
	prescriptionText: String,
   	prescriptionImg: String,
   	isAccepted: Boolean,
   	isDispached: Boolean,
   	isDelevered: Boolean,
   	isCanceled: Boolean,
   	canceledBy: String,
	orderDate: String,
	orderTime: String,
    data: { data: Buffer, contentType: String }
    });
var OrdersModel = mongoose.model('OrdersModel', data);

module.exports.OrdersModel = OrdersModel;