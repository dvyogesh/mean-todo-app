var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/todos');
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected TodoModel');
});

var TodoModel = mongoose.model('TodoModel', {
    task: String,
    isCompleted: Boolean,
    isEditing: Boolean
});
// var OrderModel = mongoose.model('OrderModel', {
//     email: String,
//     phoneNumber: Boolean,
//     prescription: Object
// });



module.exports = {
	TodoModel
	//OrderModel,
}