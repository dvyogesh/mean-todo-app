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
import {adminController} from './admin/adminController';
const app = angular.module(
	'app', 
	[uiRouter, todoFactory.name, loginFactory.name, myOrdersFactory.name ]
	);


var headerView = {
  template: require('./commen/header/header.html'),
  controller: headerController,
};

const footerView = {
 template: require('./commen/footer/footer.html'),
 controller: footerController
};
const loginView = {
	template: require('./login/login.html'),
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
	// .state('header', {
	//     url: '^/header',
	//     controller: headerController ,
	//     templateUrl: require('./commen/header/header.html')
	// }).state('header.login', {
	//     url: '^/login',
	//     controller:loginController ,
	//     templateUrl: require('./login/login.html')
	// }).state('header.login.footer', {
	// 	url: '^/',
	// 	controller: footerController,
	// 	templateUrl: require('./commen/footer/footer.html')
	    
	// })

	.state('app',{
    url: '',
    abstract: true,
    views: {
        'header': headerView,
        'content': {
            controller: loginController,
            template: require('./login/login.html') 
        },
        'footer': footerView
    },
    data:{
    	isLogin: false
    }
	 })
	.state('app.login', {
			url: '/',
			views: {
        'content@': {
            controller: loginController,
            template: require('./login/login.html')
        },
        data:{
        	isLogin: false
        }
        
      }
		})
		.state('app.myOrders', {
			url: '/my-orders',
			views: {
				'content@': {
				  controller: myOrdersController,
				  template: require('./myOrders/myOrders.html'),
				},
				data:{
					isLogin: true
				}
			}
		})
		.state('admin', {
			url: '/admin',
			views: {
				'content@': {
				  controller: adminController,
				  template: require('./admin/adminHome.html'),
				},
				data:{
					isLogin: true
				}
			}
		})
		
		// .state('myProfile', {
		// 	url: '/myProfile',
		// 	template:require('./myProfile/myProfile.html'),
		// })
		// .state('app.login.notfound', {
		// 	url: '/*',
		// 	template:require('./main.html'),
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
		
	

});

export default app;