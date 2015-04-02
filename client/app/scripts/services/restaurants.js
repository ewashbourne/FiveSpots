'use strict';

angular.module('clientApp')
.service('RestaurantsService', ['$http', function($http) {

  var location = [33.7722636,-84.3661896];
  console.log(JSON.stringify(location));
  var url = '/api/restaurants.json?location=' + location;
  this.getRestaurants = function (url) {
    return $http.get( url );
  };
}]);