'use strict';

angular.module('clientApp')
.controller('RestaurantsCtrl', ['$http', '$scope', 'RestaurantsService', function($http, $scope, RestaurantsService) {

  $scope.map = {
  center: {
    latitude:  33.7722818, 
    longitude: -84.36655619999999
  },
  zoom: 15,
   };
   var onSuccess = function(position) {
    $scope.map.center = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    };

    $scope.$apply();
};

function onError(error) {
    console.log('code: ' + error.code  + '\n' + 'message: ' + error.message + '\n');
}

navigator.geolocation.getCurrentPosition(onSuccess, onError);

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