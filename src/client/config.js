import angular from 'angular';
//import angularCSS from 'angular-css';
import uiRouter from 'angular-ui-router';
import todosController from './todos/todosController';
import todoFactory from './factories/todoFactory';
import loginFactory from './factories/loginFactory';
import myOrdersFactory from './factories/myOrdersFactory';
import loginController from './login/loginController';
import myOrdersController from './myOrders/myOrdersController'
const app = angular.module(
	'app', 
	[uiRouter, todoFactory.name, loginFactory.name, myOrdersFactory.name ]
	);
app.run(function($rootScope) {
    $rootScope.myOrdersData = [];
});

app.factory('myService', function() {

            return {

                foo: function() {

                    alert("I'm foo!");

                }

            };

        });
app.run(function($rootScope, myService) {

            $rootScope.appData = myService;

        });

 



app.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
	$urlRouterProvider.otherwise('/');
	//$stateProvider.errorOnUnhandledRejections(false);
	$stateProvider
		.state('login', {
			url: '/',
			controller: loginController,
			template:require('./login/login.html'),
		})
		.state('todo', {
			url: '/todo',
			template: require('./todos/todos.html'),
			controller: todosController,
		})
		.state('about', {
			url: '/about',
			template:require('./about/about.html'),
		})
		.state('myOrders', {
			url: '/my-orders',
			template:require('./myOrders/myOrders.html'),
			controller: myOrdersController
		})
		.state('myProfile', {
			url: '/myProfile',
			template:require('./myProfile/myProfile.html'),
		})
		
	$locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});

});

export default app;