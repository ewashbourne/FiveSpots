'use strict';

angular.module('clientApp')
.controller('RestaurantsCtrl', ['$http', '$rootScope', '$scope', 'RestaurantsService', function($http, $rootScope, $scope, RestaurantsService) {

  $scope._ = _;   
  $scope.restaurantMarkers = [];

  // this function sets up the Original marker and map center
  var onSuccess = function(position) {
    var coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    };
    console.log('User speed: ' + position.coords.speed);
    console.log(coords);
    $scope.map = {
      center: coords,
      zoom: 15,
    };
    var markerSet = _.once(makeMarker);
    $scope.marker = markerSet(coords);
    // $scope.marker = isUserStationary(position) ?  : $scope.marker;
    // set up api query string using current location as center of search
    var location = coords.latitude.toString() + ',' + coords.longitude.toString();
    var url = '/api/restaurants.json?location=' + location;
    $scope.getRestaurants(url);
  };

  function makeMarker(coords) {
    console.log('in makeMarker');
    var obj = { idKey: 0, coords: coords };
    return obj;
  }

  // function isUserStationary(position) {
  //   console.log('_.negate(_.isNull(position.coords.speed)) ' + _.negate(_.isNull(position.coords.speed)));
  //   return angular.isUndefined($scope.marker) || _.negate(_.isNull(position.coords.speed));
  // }


    // Html 5 Api function to get position 
  navigator.geolocation.getCurrentPosition(onSuccess);

  // function create markers from a list of restaurants
  function makeRestaurantMarkers(restaurants) {
    var list = [];
    console.log('in makeRestaurantMarkers restaurant: ' + JSON.stringify(restaurants));
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

  // filter list of restaurants to (lower level)
  function restaurantSelect() {
    // return _.find($scope.restaurants, function(restaurant) {
    //   // console.log('in restaurantSelect: ' + JSON.stringify(restaurant));
    //   return restaurant.price_level < 3 && restaurant.rating > 3.8;
    //     // restaurant.opening_hours.open_now && 
    // });
    return _.map(_.filter($scope.restaurants, function(restaurant){
      return restaurant.price_level < 3 && restaurant.rating > 3.8;
    }));
  }

  // get data from google places via rails server
  $scope.getRestaurants = function (url) {
    RestaurantsService.getRestaurants(url) 
    .success(function(data) {
      var results = data.results;
      // console.log('results: ' + JSON.stringify(results));
      $scope.restaurants = results;
      console.log('result from restaurantSelect: ' + JSON.stringify(restaurantSelect()));
      makeRestaurantMarkers(restaurantSelect());
    })
    .error(function(data) {
      console.log('error --->\n' + data);
    });
  };

}]);