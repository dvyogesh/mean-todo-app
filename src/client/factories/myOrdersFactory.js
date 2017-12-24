import _ from 'lodash';
import angular from 'angular';

const myOrdersFactory = angular.module('app.myOrdersFactory', [])
.factory('myOrdersFactory', ($http) => {
	function getOrders($scope) {
		var orderData = [
		{
			orderImage: '//www.softchalk.com/lessonchallenge09/lesson/Pharmacology/MC-pharmacy_medsManager_winter07_rxproof_1.jpg',
			orderDate: '1/11/2018',
			orderTime: '10:20 AM',
			orderStatus: {
				isAccepted: true,
				isDispached: true,
				isDelevered: true,
				isCancel: false
			}

		},
		{
			orderImage: '//wikihow.com/images/thumb/0/02/Write-a-Prescription-Step-15.jpg/aid5679943-v4-728px-Write-a-Prescription-Step-15.jpg',
			orderDate: '12/7/2018',
			orderTime: '01:20 PM',
			orderStatus: {
				isAccepted: true,
				isDispached: true,
				isDelevered: false,
				isCancel: false
			}

		},
		{
			orderImage: 'https://www.wikihow.com/images/thumb/f/f7/Read-a-Doctor%27s-Prescription-Step-2-Version-5.jpg/aid11971-v4-728px-Read-a-Doctor%27s-Prescription-Step-2-Version-5.jpg',
			orderDate: '11/12/2017',
			orderTime: '4:20 AM',
			orderStatus: {
				isAccepted: true,
				isDispached: false,
				isDelevered: false,
				isCancel: false
			}

		}
	];
		$http.get('/myOrders').then((responce) =>{
			if (responce.data.myOrders.length > 1) {
				$scope.orderData = responce.data.myOrders
			} else {
				$scope.orderData = orderData
			}
			console.log(responce);

		},(err)=>{
			console.log('error in get task');
		})
	};

	// function createTask($scope, flags) {
	// 	$http({
	// 	       method : "POST",
	// 	       url : "/todos",
	// 	       data: {
	// 	       	task: $scope.createTaskInput,
	// 	       	isCompleted: false,
	// 	       	isEditing: false
	// 	       }
	// 	   }).then(function (response) {
	// 	   		$scope.createTaskInput = '';
	// 	       	getTasks($scope);
	// 	        console.log('response');
	// 	   }, function (error) {
	// 	       console.log(error);
	// 	   });
		
	// };

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
		getOrders
		// onEditUpdateClick,
		// onCompletedClick,
		// onEditClick,
		// onEditCancelClick,
		// onDeleteClick,
		// watchCreateTaskInput,
		// getTasks
	}
});

export default myOrdersFactory;
