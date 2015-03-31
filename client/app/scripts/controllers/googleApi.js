'use strict'; 

angular.module('clientApp')
.controller('GoogleApiController',['$scope', 'Google', function($scope, Google) {
  Google.getSearch()
  .then(function(data){
    $scope.places = data.result;
  });
}]);