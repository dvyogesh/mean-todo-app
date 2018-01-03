import _ from 'lodash';
import angular from 'angular';
import fileUpload from '../directives/fileUpload';

const loginFactory = angular.module('app.loginFactory', [])
.factory('loginFactory', ($http, $location) => {
	// function getTasks($scope) {
	// 	$http.get('/todos').then((responce) =>{
	// 		$scope.todos = responce.data.todos;
	// 		console.log(responce);

	// 	},(err)=>{
	// 		console.log('error in get task');
	// 	})
	// };



	function createOrder($scope, flags) {
	   
		$http({
			   method : "POST",
			   type: 'POST',
			   url : "/ordersWhileLogin",
			   data: {
			   	prescriptionImg: $scope.userPrescriptionInput,
			   	email: $scope.userEmailInput,
			   	orderData: [
				   	{
				   		prescriptionText: $scope.prescriptionText,
				   		prescriptionImg: $scope.userPrescriptionInput
				   	}
			   	],
			   	phoneNumber: $scope.userPhoneNumberInput,
			   	prescriptionText: $scope.prescriptionText
			   },
			   withCredentials: true,
			   cache: false,
	       contentType: false,
	       processData: false,
			   headers: {
			   	formData: true,
			 	},
			 
        crossDomain: true

		   }).then(function (response) {
		   	$scope.orderData = response.data;
				$location.path('/my-orders');
				$scope.createOrderInput = '';
				console.log(response)
				
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
