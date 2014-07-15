var driveManager = angular.module('driveManager' , [ 'ngRoute', 'restangular' ]);

driveManager.run(function($rootScope, AuthService, SessionService) {
	AuthService.login(null);
});

driveManager.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'app/views/dashboard.html',
				controller: 'DashboardController',
				routeTitle: 'Dashboard',
				routeName: 'dashboard'
			}).
			when('/orders/:id', {
				templateUrl: 'app/views/order.html',
				controller: 'OrdersController',
				routeTitle: 'Commande',
				routeName: 'orders'
			}).
			otherwise({
				redirectTo: '/'
			});
	}
]);

driveManager.config(function(RestangularProvider) {
	RestangularProvider.setBaseUrl(API_URL);
	RestangularProvider.setDefaultHeaders({
		'radian_app': 'radian_drivemanager',
	});
	RestangularProvider.setDefaultHttpFields({
		'withCredentials': true
	});
});