var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/todos');
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected MyOrdersModel');
});

var MyOrdersModel = mongoose.model('MyOrdersModel', {
	orderImage: String,
	orderDate: String,
	orderTime: String,
	orderStatus: {
		isAccepted: Boolean,
		isDispached: Boolean,
		isDelevered: Boolean,
		isCancel: Boolean
	}

});

module.exports.MyOrdersModel = MyOrdersModel;