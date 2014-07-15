driveManager.controller('DashboardController', function ($scope, Restangular, $timeout, $location) {
	$scope.orders = {};
	$scope.refresh = function() {
		$scope.orders.prepare = Restangular.all('drive/orders').getList({ nesting : 1 , prepare : 1 }).$object;
		$scope.orders.preparing = Restangular.all('drive/orders').getList({ nesting : 1 , preparing : 1 }).$object;
		$scope.orders.prepared = Restangular.all('drive/orders').getList({ nesting : 1 , prepared : 1 }).$object;
	};

	$scope.refresh();

	$scope.open = function(order) {
		$location.path('/orders/' + order.id);
	}
});