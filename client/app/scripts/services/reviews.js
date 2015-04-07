'use strict';

angular.module('clientApp')
.service('ReviewService', ['$http', function($http) {

  this.getReviews = function () {
    return $http.get('/api/reviews/');
  };

  this.getReview = function(id) {
    return $http.get('/api/reviews/' + id);
  };

  this.postReview = function (review) {
    return $http.post('/api/reviews.json', { review: review } );
  };

  // used to pass restaurant id to form
  var id;
  this.getRestaurantId = function() {
    return id;
  };

  this.setRestaurantId = function(value) {
    id = value;
  };


}]);