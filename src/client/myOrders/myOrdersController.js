import _ from 'lodash';

export default function ($scope, myOrdersFactory, $state) {
	// let flags = {
	// 	CREATE_HAS_INPUT: false
	// };
	// $scope.orderData = [
	// 	{
	// 		orderImage: '//www.softchalk.com/lessonchallenge09/lesson/Pharmacology/MC-pharmacy_medsManager_winter07_rxproof_1.jpg',
	// 		orderDate: '1/11/2018',
	// 		orderTime: '10:20 AM',
	// 		orderStatus: {
	// 			isAccepted: true,
	// 			isDispached: true,
	// 			isDelevered: true,
	// 			isCancel: false
	// 		}

	// 	},
	// 	{
	// 		orderImage: '//wikihow.com/images/thumb/0/02/Write-a-Prescription-Step-15.jpg/aid5679943-v4-728px-Write-a-Prescription-Step-15.jpg',
	// 		orderDate: '12/7/2018',
	// 		orderTime: '01:20 PM',
	// 		orderStatus: {
	// 			isAccepted: true,
	// 			isDispached: true,
	// 			isDelevered: false,
	// 			isCancel: false
	// 		}

	// 	},
	// 	{
	// 		orderImage: 'https://www.wikihow.com/images/thumb/f/f7/Read-a-Doctor%27s-Prescription-Step-2-Version-5.jpg/aid11971-v4-728px-Read-a-Doctor%27s-Prescription-Step-2-Version-5.jpg',
	// 		orderDate: '11/12/2017',
	// 		orderTime: '4:20 AM',
	// 		orderStatus: {
	// 			isAccepted: true,
	// 			isDispached: false,
	// 			isDelevered: false,
	// 			isCancel: false
	// 		}

	// 	}
	// ];

	const {onCancelOrderClick} = myOrdersFactory;
	myOrdersFactory.clearSession();
	myOrdersFactory.getSession($scope);
	//myOrdersFactory.onCancelOrderClick($scope);
	$scope.onCancelOrderClick = _.partial(onCancelOrderClick, $scope)
	// $scope.onCompletedClick = todo => onCompletedClick(todo);

	// $scope.createTask = _.partial(createTask, $scope, flags);
	// $scope.$watch('createTaskInput', _.partial(watchCreateTaskInput, flags, $scope));
	// //$scope.$watch('createTaskInput', _.partial(watchCreateTaskInput, flags, $scope));
	// //here we are binding flags, $scope to watchCreateTaskInput


	// $scope.onEditClick = todo => onEditClick(todo);

	// //$scope.onEditUpdateClick = todo => onEditUpdateClick(todo);
	// //or
	// $scope.onEditUpdateClick = _.partial(onEditUpdateClick, $scope);
	// // onclick we are passing tod so we no need to pass/bind  "todo"/"$scope" agin if we use _.partial 

	// $scope.onEditCancelClick = todo => onEditCancelClick(todo);

	// $scope.onDeleteClick  = _.partial(onDeleteClick, $scope); 
	// onclick we are passing tod so we no need to pass/bind  "todo"/"$scope" agin if we use _.partial 
}