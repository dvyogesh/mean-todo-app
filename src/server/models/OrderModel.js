var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/orders');
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected OrderModel');
});

var OrderModel = mongoose.model('OrderModel', {
    email: String,
    phoneNumber: Boolean,
    prescription: Object
});

module.exports.OrderModel = OrderModel;