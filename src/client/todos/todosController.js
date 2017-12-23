import _ from 'lodash';

export default function ($scope, todoFactory) {
	let flags = {
		CREATE_HAS_INPUT: false
	};

	todoFactory.getTasks($scope);
	// $scope.todos = [
	// 	{
	// 		task: 'do dishes',
	// 		isCompleted: false,
	// 		isEditing: false
	// 	},
	// 	{
	// 		task: 'walk do king',
	// 		isCompleted: false,
	// 		isEditing: false
	// 	},
	// 	{
	// 		task: 'do work',
	// 		isCompleted: true,
	// 		isEditing: false
	// 	}
	// ];

	const {onCompletedClick, createTask, watchCreateTaskInput, onEditClick,
		onEditUpdateClick, onEditCancelClick, onDeleteClick} = todoFactory;

	$scope.onCompletedClick = todo => onCompletedClick(todo);

	$scope.createTask = _.partial(createTask, $scope, flags);
	$scope.$watch('createTaskInput', _.partial(watchCreateTaskInput, flags, $scope));
	//$scope.$watch('createTaskInput', _.partial(watchCreateTaskInput, flags, $scope));
	//here we are binding flags, $scope to watchCreateTaskInput


	$scope.onEditClick = todo => onEditClick(todo);

	//$scope.onEditUpdateClick = todo => onEditUpdateClick(todo);
	//or
	$scope.onEditUpdateClick = _.partial(onEditUpdateClick, $scope);
	// onclick we are passing tod so we no need to pass/bind  "todo"/"$scope" agin if we use _.partial 

	$scope.onEditCancelClick = todo => onEditCancelClick(todo);

	$scope.onDeleteClick  = _.partial(onDeleteClick, $scope); 
	// onclick we are passing tod so we no need to pass/bind  "todo"/"$scope" agin if we use _.partial 
}