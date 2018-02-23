var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/todos');
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected UsersModel');
});
const Schema = mongoose.Schema;
const data = new Schema({  
	Name: String,
	Email: String,
	PhoneNumber: String
});
const UsersModel = mongoose.model('users', data);


module.exports.UsersModel = UsersModel;