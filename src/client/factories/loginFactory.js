import _ from 'lodash';
import angular from 'angular';

const loginFactory = angular.module('app.loginFactory', [])
.factory('loginFactory', ($http) => {
	// function getTasks($scope) {
	// 	$http.get('/todos').then((responce) =>{
	// 		$scope.todos = responce.data.todos;
	// 		console.log(responce);

	// 	},(err)=>{
	// 		console.log('error in get task');
	// 	})
	// };

	function createOrder($scope, flags) {
			// var file = $scope.userPrescriptionInput;
			// //var file = $scope.myFile;
			//        // var uploadUrl = "/multer";
			//         var fd = new FormData();
			//         fd.append('file', file);
	  //      console.log('file is ' );
	  //      console.log(file)
	  //      console.dir(file);

	       var prescription = document.getElementById('prescription');
	       var file = prescription.files[0];
	       var fromData = new FormData();
			fromData.append('file', file);
	       console.log(file)
	       console.dir(file);
		//var formData = new FormData($scope);
		// formData.append('email', form.title);
		// formData.append('phoneNumber', form.description);
		// formData.append('prescription', $scope.userPrescriptionInput);
		//console.log(formData);
			var dataToSend = {
		       	email: $scope.userEmailInput,
		       	phoneNumber: $scope.userPhoneNumberInput,
		       	prescription: fromData
		       }
		$http({
		       method : "POST",
		       url : "/order",
		       data: dataToSend

		   }).then(function (response) {
		   		$scope.createOrderInput = '';
		       	//getTasks($scope);
		        console.log('response');
		   }, function (error) {
		       console.log(error);
		   });
		
	};

	// function onEditUpdateClick($scope, todo) {
	// 	console.log(todo);
	// 	$http({
	// 	       method : "PUT",
	// 	       url : '/todos/'+todo._id,
	// 	       data: {
	// 	       	task: todo.updatedTask
	// 	       }
	// 	   }).then(function(response) {
	// 	       getTasks($scope);
 //            	todo.isEditing = false;
	// 	       console.log(response);
	// 	       console.log('sucs');
	// 	   }, function(error) {
	// 	       console.log(error);
	// 	   });
	// };

	// function onCompletedClick(todo) {
	// 	todo.isCompleted = !todo.isCompleted;
	// };

	// function onEditClick(todo) {
	// 	todo.isEditing = true;
	// }

	// function onEditCancelClick(todo) {
	// 	todo.isEditing = false;
	// }

	// function onDeleteClick ($scope, todoToDelete) {
	// 	$http({
	// 		method : "DELETE",
	// 		url : '/todos/'+todoToDelete._id,
	// 	}).then(function(responce) {
	// 		console.log(responce);
	// 		console.log('scucess')
	// 		_.remove($scope.todos, xyz => xyz.task === todoToDelete.task);
	// 	})
		

	// }

	// function watchCreateTaskInput(flags, $scope, val) {
	// 	if (!val && flags.CREATE_HAS_INPUT) {
	// 		$scope.todos.pop();
	// 		flags.CREATE_HAS_INPUT = false;
	// 	}else if (val && !flags.CREATE_HAS_INPUT) {
	// 		$scope.todos.push({task: val, isCompleted: false});
	// 		flags.CREATE_HAS_INPUT = true;
	// 	} else if (val && flags.CREATE_HAS_INPUT) {
	// 		$scope.todos[$scope.todos.length - 1].task = val;
	// 	}
	// }

	return {
		createOrder,
		// onEditUpdateClick,
		// onCompletedClick,
		// onEditClick,
		// onEditCancelClick,
		// onDeleteClick,
		// watchCreateTaskInput,
		// getTasks
	}
});

export default loginFactory;
