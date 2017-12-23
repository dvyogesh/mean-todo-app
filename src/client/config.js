import angular from 'angular';
//import angularCSS from 'angular-css';
import uiRouter from 'angular-ui-router';
import todosController from './todos/todosController';
import todoFactory from './factories/todoFactory';
import loginFactory from './factories/loginFactory'
import loginController from './login/loginController'
const app = angular.module('app', [uiRouter, todoFactory.name, loginFactory.name]);

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
			url: '/myOrders',
			template:require('./myOrders/myOrders.html'),
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