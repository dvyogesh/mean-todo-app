
var dbUrl =  process.env.MONGOLAB_URI || 'mongodb://localhost/todos';




// var OrderModel = mongoose.model('OrderModel', {
//     email: String,
//     phoneNumber: Boolean,
//     prescription: String
// });

module.exports.dbUrl = dbUrl;