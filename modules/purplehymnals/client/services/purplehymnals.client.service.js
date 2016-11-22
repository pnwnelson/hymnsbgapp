// Purplehymnals service used to communicate Purplehymnals REST endpoints
(function () {
  'use strict';

  angular
    .module('purplehymnals')
    .factory('PurplehymnalsService', PurplehymnalsService);

  PurplehymnalsService.$inject = ['$resource'];

  function PurplehymnalsService($resource) {
    return $resource('api/purplehymnals/:purplehymnalId', {
      purplehymnalId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());

/*
  PurplehymnalsService.$inject = ['$http'];

  function PurplehymnalsService($http) {

    function query(purplehymnalId) {
      return $http({
        method: 'GET',
        url: '/api/purplehymnals/' + purplehymnalId
      }).then(function(response) {
        console.log(response, 'success');
      }, function(err) {
        console.log(err, 'error');
      });
    }

    return { query: query };
  }
}()); */

