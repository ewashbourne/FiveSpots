'use strict';

angular.module('clientApp')
.controller('RestaurantsCtrl', ['$http', '$rootScope', '$scope', 'RestaurantsService', function($http, $rooScope, $scope, RestaurantsService) {

  $scope._ = _;   
  $scope.restaurants = [];
  $scope.restaurantMarkers = [];
  $scope.userPositionSet = false;
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

    $scope.marker = $scope.userPositionSet ? $scope.marker : makeMarker(coords);
    
    // $scope.marker = isUserStationary(position) ?  : $scope.marker;
    // set up api query string using current location as center of search
    var location = coords.latitude.toString() + ',' + coords.longitude.toString();
    var url = '/api/restaurants.json?location=' + location;
    $scope.getRestaurants(url);
  };

  function makeMarker(coords) {
    console.log('in makeMarker');
    var obj = { idKey: 0, coords: coords };
    $scope.userPositionSet = true;
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
    var icon = ['blue', 'red', 'yellow', 'green', 'pink'];

    // console.log('in makeRestaurantMarkers restaurant: ' + JSON.stringify(restaurants));
    var arrayLength = restaurants.length;
    console.log('arrayLength: ' + arrayLength);
    // JSON 
    for (var i=0; i < arrayLength; i++) {
      list.push({
        name: restaurants[i].name,
        id: restaurants[i].place_id,
        latitude: restaurants[i].geometry.location.lat,
        longitude: restaurants[i].geometry.location.lng,
        priceLevel: restaurants[i].price_level,
        vicinity: restaurants[i].vicinity,
        photoReference: restaurants[i].photos[0].photo_reference,
        rating: restaurants[i].rating,
        icon: 'https://maps.gstatic.com/mapfiles/ms2/micons/' + icon[i] + '-dot.png'
      });
    }
    console.log(list);
    $scope.restaurants = list;
    $scope.restaurantMarkers = list;
  }
  
  //  ????
  function onError(error) {
      console.log('code: ' + error.code  + '\n' + 'message: ' + error.message + '\n');
  }

  // filter list of restaurants into high & low
  $scope.restaurantSelect = function (choice) {
    console.log('in restaurantSelect');
    var priceFiltered = _.map(_.filter($scope.restaurantRaw, function(restaurant){
      var choiceLevel;
      var priceChooser;
      switch (choice) {
        case 'high':
          console.log('high choice');
          choiceLevel = {
            price: 3,
            rating: 3
          };
          priceChooser = restaurant.price_level >= choiceLevel.price;
          break;
        case 'low':
          console.log('low choice');
          choiceLevel = {
            price: 1,
            rating: 3
          };
          priceChooser = restaurant.price_level <= choiceLevel.price;
          break;
        default:
          choiceLevel = {
            price: 1,
            rating: 3
          };
          priceChooser = restaurant.price_level <= choiceLevel.price;
      }
      console.log('choiceLevel: ' + JSON.stringify(choiceLevel));
      return priceChooser && restaurant.rating >= choiceLevel.rating;
    }));
    makeRestaurantMarkers(priceFiltered);
  };

  // get data from google places via rails server
  $scope.getRestaurants = function (url) {
    RestaurantsService.getRestaurants(url) 
    .success(function(data) {
      $scope.restaurantRaw = data.results;    
      console.log(data.results); 
    })
    .error(function(data) {
      console.log('error --->\n' + data);
    });
  };

}]);