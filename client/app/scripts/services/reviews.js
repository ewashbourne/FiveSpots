'use strict';

angular.module('clientApp')
.service('ReviewService', ['$http',  function($http) {

  this.getReviews = function () {
    return $http.get('/api/reviews/');
  };

  this.getReview = function(id) {
    return $http.get('/api/reviews/' + id);
  };

  this.postReview = function (review) {
    return $http.post('/api/reviews', { review: review } );
  };

}]);