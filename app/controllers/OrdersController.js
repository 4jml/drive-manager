driveManager.controller('OrdersController', function ($scope, $routeParams, Restangular, $timeout, $location, SessionService) {
	$scope.order = Restangular.one('drive/orders', $routeParams.id).get({ nesting : 1 }).$object;

	$scope.start = function() {
		$scope.order.user_id = SessionService.id;
		Restangular.one('drive/orders', $scope.order.id).customPUT($scope.order, null);
	}

	$scope.more = function(line) {
		if (line.quantity != line.availableQuantity)
		line.availableQuantity++;
	}
	$scope.less = function(line) {
		if (line.availableQuantity)
			line.availableQuantity--;
	}

	$scope.valid = function() {
		angular.forEach($scope.order.lines, function(line, key) {
			Restangular.one('drive/orderlines', line.id).customPUT(line, null);
		});
		$scope.order.prepared = 1;

		Restangular.one('drive/orders', $scope.order.id).customPUT($scope.order, null).then(function() {
			$location.path('/');
		});
	}
});