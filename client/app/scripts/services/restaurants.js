'use strict';

angular.module('clientApp')
.service('RestaurantsService', ['$http', function($http) {
  this.getRestaurants = function(url) {
    return $http.get(url);
  };
}]);