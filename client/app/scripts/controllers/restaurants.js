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
    $scope.marker = {
      idKey: 0,
      coords: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
    };
    
    $scope.$apply();
  };

  function makeRestaurantMarkers(restaurants) {
    var list = [];
    console.log(restaurants[0]);
    var arrayLength = 5;
    console.log(arrayLength);
    for (var i=0; i < arrayLength; i++) {
      list.push({
        id: restaurants[i].place_id,
        latitude: restaurants[i].geometry.location.lat,
        longitude: restaurants[i].geometry.location.lng

      });
    }
    $scope.restaurantMarkers = list;

  }


  function onError(error) {
      console.log('code: ' + error.code  + '\n' + 'message: ' + error.message + '\n');
  }

  navigator.geolocation.getCurrentPosition(onSuccess);

  // plug the geolocate data into the location variable
  var location = '33.7722636,-84.3661896';

  var url = '/api/restaurants.json?location=' + location;

  $scope.getRestaurants = function (url) {

    RestaurantsService.getRestaurants(url) 
    .success(function(data) {
      $scope.restaurants = data.results;
      makeRestaurantMarkers(data.results);
      console.log('data.results');
      console.log($scope.restaurantMarkers);
    })
    .error(function(data) {
      console.log('error --->\n' + data);
    });
  };

  $scope.getRestaurants(url);
}]);