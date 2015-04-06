'use strict';

angular.module('clientApp')
.provider('Google', function(){
  var base    = 'https://maps.googleapis.com/maps/api/place/details/json',
      baseRef = '?reference=CmRYAAAAciqGsTRX1mXRvuXSH2ErwW-jCINE1aLiwP64MCWDN5vkXvXoQGPKldMfmdGyqWSpm7BEYCgDm-iv7Kc2PF7QA7brMAwBbAcqMr5i1f4PwTpaovIZjysCEZTry8Ez30wpEhCNCXpynextCld2EBsDkRKsGhSLayuRyFsex6JA6NPh9dyupoTH3g',
      apiKey = '';

  this.setApiKey = function(key) {
    apiKey = key || apiKey;
  };

  this.$get = function($q, $http) {
    var service = {
      getSearch: function () {
        var d = $q.defer();
        $http({
          method: 'JSONP',
          url: base + baseRef,
          params: {
            'key': apiKey,
            'callback': 'JSON_CALLBACK'
          }
        }).success(function(data){
          d.resolve(data);
        }).error(function(reason) {
          d.reject(reason);
        });
        return d.promise;
      }
    };
    return service;
  };
});