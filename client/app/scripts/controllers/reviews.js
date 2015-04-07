'use strict';

angular.module('clientApp')
.controller('ReviewCtrl', ['$scope', '$state', 'ReviewService', function($scope, $state, ReviewService) {
  $scope.formReviews = [];
  $scope.getReviews = function () {
    ReviewService.getReviews()
    .success(function (data) {
      $scope.reviews = data;
    }).error(function() {
      console.log('getReviews error');
    });
  };

  $scope.getReview = function(id) {
    ReviewService.getReview(id)
    .success(function (data){
      $scope.reviewResult = data;
      console.log(data);
    }).error(function() {
      console.log('getReview/:id error');
    });
  };

  $scope.postReview = function () {
    var review = $scope.review;
    review.restaurant_id = ReviewService.getRestaurantId();
    ReviewService.postReview(review)
    .success(function (data) {
      console.log('YAY Posted');
      $state.go('home');
      $scope.formReviews.push(data);
    }).error(function() {
      console.log('Post Error');
      $state.go('home');
    });
  };
  
}]);
