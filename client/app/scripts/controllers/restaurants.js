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