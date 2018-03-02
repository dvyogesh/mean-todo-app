import _ from 'lodash';
import angular from 'angular';
import fileUpload from '../directives/fileUpload';

const loginFactory = angular.module('app.loginFactory', [])
.factory('loginFactory', ($http, $location) => {
	function getSession($scope){

	 // Check browser support
	 if (typeof(Storage) !== "undefined") {
	     // Store
	     //localStorage.setItem("userEmail", "");
	     // Retrieve
	     //document.getElementById("result").innerHTML = localStorage.getItem("userEmail");
	     $scope.user = localStorage.getItem("userEmail");
	     console.log($scope.user)
	     if ($scope.user) {
	     	$location.path('/my-orders');

	     }
	     
	     
	 } else {
	     console.log("Sorry, your browser does not support Web Storage...");
	 }
	};

	function clearSession() {
		// $http({
		// 	   method : "POST",
		// 	   type: 'POST',
		// 	   url: '/logout'
		// 	 }).then(function (response) {
		// 	 	//localStorage.setItem("userEmail", "");
		// 	 	$location.path('/');
		// 	 })
	};
	// function getTasks($scope) {
	// 	$http.get('/todos').then((responce) =>{
	// 		$scope.todos = responce.data.todos;
	// 		console.log(responce);

	// 	},(err)=>{
	// 		console.log('error in get task');
	// 	})
	// };



	function createOrder($scope, flags) {
		var today = new Date();
		var todayLocal = today.toLocaleDateString();
		var todayLocalTime = today.toTimeString();

		var PrescriptionImg = $scope.PrescriptionImges;
		var fd = new FormData();
		for ( var i = 0; PrescriptionImg && i < PrescriptionImg.length; i++){
		  
		  fd.append("file", PrescriptionImg[i]);
		}
		console.log(fd);
		console.dir(fd)
	   console.log('PrescriptionImg');
	   
	   console.log(PrescriptionImg);

	  const DATA_TO_SEND = {
	  	user: $scope.userEmailInput,
	  	email: $scope.userEmailInput,
	  	phoneNumber: $scope.userPhoneNumberInput,
	  	prescriptionText: $scope.prescriptionText,
	   	// prescriptionImg: '',
	   	// isAccepted: false,
	   	// isDispached: false,
	   	// isDelevered: false,
	   	// isCanceled: false,
	   	// canceledBy: '',
   		// orderDate: todayLocal,
   		// orderTime: todayLocalTime
	  };
	  fd.append("data", JSON.stringify(DATA_TO_SEND));
		$http({
			   method : "POST",
			   type: 'POST',
			   url : "/ordersWhileLogin",
			   // data: fd,
			   // withCredentials : false,
		     headers : {
		     'Content-Type' : undefined
		     },
		    cache: false,
		    data: fd,

		   }).then(function (response) {
		   	if (typeof(Storage) !== "undefined") {
		   	    // Store
		   	    localStorage.setItem("userEmail", $scope.userEmailInput);
		   	    console.log("sucess");
		   	} else {
		   	    console.log("Sorry, your browser does not support Web Storage...");
		   	}
		   	$scope.orderData = response.data;
				//$location.path('/my-orders');
				$scope.createOrderInput = '';
				console.log(response)
				
				console.log('response');
				$location.path('/my-orders');
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
		getSession,
		clearSession,
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
