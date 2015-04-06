'use strict';

angular.module('clientApp')
.controller('RestaurantsCtrl', ['$http', '$scope', 'RestaurantsService', function($http, $scope, RestaurantsService) {
  $scope.restaurantMarkers = [];
  function initialize () {
    var coords = {
        latitude: 33.7722818,
        longitude: -84.3665563
    };
    makeRestaurantMarkers(restaurants);
  }


   
  var onSuccess = function(position) {
    var coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    };
    console.log(coords);
    $scope.map = {
      center: coords,
      zoom: 15,
    };
    $scope.marker = angular.isUndefined($scope.marker) ? {  
      idKey: 0,
      coords: coords
    } : $scope.marker;

    var location = coords.latitude.toString() + ',' + coords.longitude.toString();
    var url = '/api/restaurants.json?location=' + location;
    console.log(url);
    $scope.getRestaurants(url);
  };

  function makeRestaurantMarkers(restaurants) {
    var list = [];
    console.log('restaurant: ' + restaurants);
    var arrayLength = restaurants.length;
    console.log('arrayLength: ' + arrayLength);
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

  

  $scope.getRestaurants = function (url) {

    RestaurantsService.getRestaurants(url) 
    .success(function(data) {
      var results = data.results;
      // console.log('data.results: ' + data.status);
      console.log('data.results: ' + data.results);
      $scope.restaurants = results;
      makeRestaurantMarkers(results);
    })
    .error(function(data) {
      console.log('error --->\n' + data);
    });
  };

  
}]);