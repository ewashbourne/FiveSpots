'use strict';

angular.module('clientApp')
.controller('RestaurantsCtrl', ['$http', '$scope', 'RestaurantsService', function($http, $scope, RestaurantsService) {

  $scope.getRestaurants = function () {
    RestaurantsService.getRestaurants() 
    .success(function(data) {
      $scope.restaurants = data;
    })
    .error(function(data) {
      console.log('error --->\n' + data);
    });
  };

  $scope.getRestaurants();
}]);