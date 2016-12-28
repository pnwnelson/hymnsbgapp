// Hymnals service used to communicate Hymnals REST endpoints
(function () {
  'use strict';

  angular
    .module('hymnals')
    .factory('HymnalsService', HymnalsService);

  HymnalsService.$inject = ['$resource'];

  function HymnalsService($resource) {
    return $resource('api/hymnals/:hymnalId', {
      hymnalId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
