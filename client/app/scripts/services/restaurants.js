'use strict';

angular.module('clientApp')
.service('RestaurantsService', ['$http', function($http) {

  this.getRestaurants = function () {
    return $http.get('/api/restaurants.json');
  };
}]);