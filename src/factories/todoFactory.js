import _ from 'lodash';
import angular from 'angular';

const todoFactory = angular.module('app.todoFactory', [])
.factory('todoFactory', ($http) => {
	function getTasks($scope) {
		$http.get('/todos').then((responce) =>{
			$scope.todos = responce.data.todos;
			console.log(responce);

		},(err)=>{
			console.log('error in get task');
		})
	};

	function createTask($scope, flags) {
		$http({
		       method : "POST",
		       url : "/todos",
		       data: {
		       	task: $scope.createTaskInput,
		       	isCompleted: false,
		       	isEditing: false
		       }
		   }).then(function (response) {
		   		$scope.createTaskInput = '';
		       	getTasks($scope);
		        console.log('response');
		   }, function (error) {
		       console.log(error);
		   });
		
	};

	function onEditUpdateClick($scope, todo) {
		console.log(todo);
		$http({
		       method : "PUT",
		       url : '/todos/'+todo._id,
		       data: {
		       	task: todo.updatedTask
		       }
		   }).then(function(response) {
		       getTasks($scope);
            	todo.isEditing = false;
		       console.log(response);
		       console.log('sucs');
		   }, function(error) {
		       console.log(error);
		   });
	};

	function onCompletedClick(todo) {
		todo.isCompleted = !todo.isCompleted;
	};

	function onEditClick(todo) {
		todo.isEditing = true;
	}

	function onEditCancelClick(todo) {
		todo.isEditing = false;
	}

	function onDeleteClick ($scope, todoToDelete) {
		$http({
			method : "DELETE",
			url : '/todos/'+todoToDelete._id,
		}).then(function(responce) {
			console.log(responce);
			console.log('scucess')
			_.remove($scope.todos, xyz => xyz.task === todoToDelete.task);
		})
		

	}

	function watchCreateTaskInput(flags, $scope, val) {
		if (!val && flags.CREATE_HAS_INPUT) {
			$scope.todos.pop();
			flags.CREATE_HAS_INPUT = false;
		}else if (val && !flags.CREATE_HAS_INPUT) {
			$scope.todos.push({task: val, isCompleted: false});
			flags.CREATE_HAS_INPUT = true;
		} else if (val && flags.CREATE_HAS_INPUT) {
			$scope.todos[$scope.todos.length - 1].task = val;
		}
	}

	return {
		createTask,
		onEditUpdateClick,
		onCompletedClick,
		onEditClick,
		onEditCancelClick,
		onDeleteClick,
		watchCreateTaskInput,
		getTasks
	}
});

export default todoFactory;
