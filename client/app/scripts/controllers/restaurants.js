'use strict';

angular.module('clientApp')
.controller('RestaurantsCtrl', ['$http', '$scope', 'RestaurantsService', function($http, $scope, RestaurantsService) {
  
  
  // plug the geolocate data into the location variable
  var location = '33.7722636,-84.3661896';

  var url = '/api/restaurants.json?location=' + location;


  $scope.getRestaurants = function (url) {

    RestaurantsService.getRestaurants(url) 
    .success(function(data) {
      $scope.restaurants = data.results;

    })
    .error(function(data) {
      console.log('error --->\n' + data);
    });
  };

  $scope.getRestaurants(url);
}]);
