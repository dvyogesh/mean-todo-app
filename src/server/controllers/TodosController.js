// var mongoose = require('mongoose');
// var Todo = require('../models/TodoModel').TodoModel;
// var express = require('express');
// var router = express.Router();

// router.get('/', function(req, res) {
// 	//res.send('i am yog king');
	
// 	Todo.find(function(err, results) {
// 		if (err) {console.log('err')}
// 		res.header("Cache-Control", "no-cache, no-store, must-revalidate");
// 		res.send({todos:results})
// 	})
// });

// router.post('/', function(req, res)	 {
// 	var todo = new Todo(req.body);
// 	todo.save(function(err) {
// 		if (err) {console.log('err')}else{console.log('sucess')}
// 		res.send('task created');
// 	});
// });

// router.put('/:id', function(req, res) {
//     var id = req.params.id;
//     console.log('yop');
//     Todo.update({ _id: mongoose.Types.ObjectId(id) }, {
//         $set: { task: req.body.task }

//     }, function(err) {
//         if (err) { console.log(err); }
//         res.send('ToDo updated');
//     });
//     console.log('nop');
// });

// router.delete('/:id', function(req, res) {
//     var id = req.params.id;
//     //console.log('del')
//     Todo.remove({ _id: mongoose.Types.ObjectId(id) }, function(err) {
//         if (err) { console.log(err); }

//         res.send('ToDo deleted');
//     });
//     //
// });

// module.exports = router;