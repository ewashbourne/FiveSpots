'use strict';

angular.module('clientApp')
.controller('RestaurantsCtrl', ['$http', '$rootScope', '$timeout', '$scope', 'RestaurantsService', function($http, $rootScope, $timeout, $scope, RestaurantsService) {

  $scope._ = _;   
  $scope.restaurants = [];
  $scope.restaurantMarkers = [];

  // this function sets up initial map center
  var centerMap = function(position) {

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
  };

  // this function sets up the User position marker 
  var userPosition = function(position) {
    var coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    };
        
    $scope.marker = makeMarker(coords);
   
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

    // Html 5 Api function to get position 
  navigator.geolocation.watchPosition(centerMap);

  navigator.geolocation.watchPosition(userPosition);

  // function create markers from a list of restaurants
  function makeRestaurantMarkers(restaurants) {
    var list = [];
    var icon = ['blue', 'red', 'yellow', 'green', 'pink'];

    // console.log('in makeRestaurantMarkers restaurant: ' + JSON.stringify(restaurants));
    var arrayLength = restaurants.length;
    console.log('restaurantMarker arrayLength: ' + arrayLength);
    // JSON 
    for (var i=0; i < 5; i++) {
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
            price: 2,
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

    // ensure a unique object array [priceFiltered] while filling up to length of 5 
    // adding to array using sort order by rating then price
    console.log('priceFiltered length: ' + priceFiltered.length);
    

    if (priceFiltered.length < 5) {
      var tempPriceFiltered = priceFiltered;
      var presort = restaurantSort($scope.restaurantRaw);
      var deleteTest;
      console.log('presort: ' + JSON.stringify(presort));

      for (var i=0; i < $scope.restaurantRaw.length; i++) {
        deleteTest = tempPriceFiltered.push(presort[i]);
        priceFiltered = _.uniq(deleteTest, 'results.place_id');
      }
    } 
    console.log('priceFiltered: ' + JSON.stringify(priceFiltered));
    makeRestaurantMarkers(restaurantSort(priceFiltered));
  };

  
  function restaurantSort (restaurants) {
    return _.sortByOrder(restaurants, ['rating','price_level'], [false, false]);
  }

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

