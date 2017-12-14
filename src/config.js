import angular from 'angular';
import uiRouter from 'angular-ui-router';
import todosController from 'todos/todosController';
import todoFactory from 'factories/todoFactory';
const app = angular.module('app', [uiRouter, todoFactory.name]);

app.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
	$urlRouterProvider.otherwise('/');
	//$stateProvider.errorOnUnhandledRejections(false);
	$stateProvider
		.state('todos', {
			url: '/',
			template: require('todos/todos.html'),
			controller: todosController
		})
		.state('about', {
			url: '/about',
			template:require('about/about.html')
		})
	$locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});

});

export default app;