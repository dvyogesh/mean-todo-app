var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/todos');
//mongoose.Promise = global.Promise // <--
mongoose.connection.on('connected', function () {

    console.log('Mongoose connected OrderModel');
});

var Schema = mongoose.Schema;

var ImageSchema = new mongoose.Schema({
    image : Buffer,
    fileType:{type:String},
    fileName:{type:String},
    base64Image: {type:String}
});

var OrderSchema = new mongoose.Schema({
    userId: { type: String },
    user: {type: String},
    phoneNumber: { type: String },
    OrderDate : { type: Date, default: Date.now },
    prescriptionImages: [ImageSchema],
    prescriptionText: {type: String},
    isAccepted: {type: String},
    isDispached: {type: String},
    isDelevered: {type: String},
    isCanceled: {type: Boolean},
    canceledDate: {type: String},
    canceledBy: {type: String}
});

var UserSchema = new mongoose.Schema({
    email: {type:String},
    phoneNumber: {type:String},
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
});

var Orders = mongoose.model('Orders', OrderSchema);
var Users = mongoose.model('users', UserSchema);

// var OrderModel = mongoose.model('OrderModel', {
//     email: String,
//     phoneNumber: Boolean,
//     prescription: String
// });

module.exports = {
    Orders,
    Users
};