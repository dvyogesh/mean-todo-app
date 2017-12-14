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

	function createTask ($scope, flags) {
		$http.post('/todos', {
			task: $scope.createTaskInput,
			isCompleted: true,
			isEditing: true
		}).then((response) =>{
			//flags.CREATE_HAS_INPUT = false;
			$scope.createTaskInput = '';
			getTasks($scope)
			//console.log(response);
		},(err)=>{
			console.log('asfwe');
		})

		// $http({
		//        method : "POST",
		//        url : "/"
		//    }).then(function mySuccess(response) {
		//        flags.CREATE_HAS_INPUT = false;
		//        $scope.createTaskInput = '';
		//        console.log(response);
		//    }, function myError(response) {
		//        console.log('erroe');
		//    });
		
	};

	function onEditUpdateClick(todo) {
		console.log(todo)
		$http.put(`/todos/${todo._id}`, {
			task:todo.updatedTask
		}).then((responce) => {
			todo.task = todo.updatedTask;
			console.log(responce);
			console.log('responce');
		},(err) => {
			console.log(err)
		})
		// todo.task = todo.updatedTask;
		// todo.isEditing = false;
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
		_.remove($scope.todos, xyz => xyz.task === todoToDelete.task);

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
