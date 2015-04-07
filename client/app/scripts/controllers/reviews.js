'use strict';

angular.module('clientApp')
.controller('ReviewCtrl', ['$scope', 'ReviewService', function($scope, ReviewService) {
  $scope.getReviews = function () {
    ReviewService.getReviews().success(function (data) {
      $scope.reviews = data;
    }).error(function(data) {
      console.log('error: ' + data);
    }
  };

  $scope.postReviews = function () {
    ReviewService.postReviews($scope.formReviews).success(function () {
      console.log('YAY Posted');
    }).error(function() {
      console.log('Post Error');
    });
  };
  
}]);
