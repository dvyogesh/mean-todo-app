var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/todos');
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected');
});

var Todo = mongoose.model('Todo', {
    task: String,
    isCompleted: Boolean,
    isEditing: Boolean
});

module.exports.Todo = Todo;