import angular from 'angular';
//import angularCSS from 'angular-css';
import uiRouter from 'angular-ui-router';
import todosController from './todos/todosController';
import todoFactory from './factories/todoFactory';
import loginFactory from './factories/loginFactory';
import myOrdersFactory from './factories/myOrdersFactory';
import loginController from './login/loginController';
import myOrdersController from './myOrders/myOrdersController';
import {footerController} from './commen/footer/footerController';
import {headerController} from './commen/header/headerController';
const app = angular.module(
	'app', 
	[uiRouter,'ui.router', todoFactory.name, loginFactory.name, myOrdersFactory.name ]
	);


var headerView = {
  templateUrl: require('./commen/header/header.html'),
  controller: headerController,
};

const footerView = {
 templateUrl: require('./commen/footer/footer.html'),
 controller: footerController
};
const loginView = {
	templateUrl: require('./login/login.html'),
	controller: footerController
}



app.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
	$urlRouterProvider.otherwise('/');
	$locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});
	//$stateProvider.errorOnUnhandledRejections(false);


	$stateProvider


	.state('app',{
    url: '/',
    views: {
        'header': {
        		controller: headerController,
            templateUrl: require('./commen/header/header.html'),

        },
        'contentt': {
            controller: loginController,
            template: require('./login/login.html') 
        },
        'footer': {
          templateUrl: require('./commen/footer/footer.html'),
          controller: footerController
        }
    }
	 })
		
		// .state('login', {
		// 	url: '/',
		// 	views: {
		// 		'':{
		// 			templateUrl: require('./main.html'),
		// 		},
		// 		'header@login': {
		// 			templateUrl: require('./commen/header/header.html'),
		// 		},
  //       'content@login': {
  //           controller: loginController,
  //           template: require('./login/login.html')
  //       },
  //       'footer@login': footerView
  //     }
		// })
		// .state('todo', {
		// 	url: '/todo',
		// 	template: require('./todos/todos.html'),
		// 	controller: todosController,
		// })
		// .state('about', {
		// 	url: '/about',
		// 	template:require('./about/about.html'),
		// })
		// .state('myOrders', {
		// 	url: '/my-orders',
		// 	template:require('./myOrders/myOrders.html'),
		// 	controller: myOrdersController
		// })
		// .state('myProfile', {
		// 	url: '/myProfile',
		// 	template:require('./myProfile/myProfile.html'),
		// })
		// .state('*', {
		// 	url: '/*',
		// 	controller: loginController,
		// 	template:require('./login/login.html'),
		// })
		
	

});

export default app;