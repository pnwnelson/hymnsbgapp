// Cogwahymnals service used to communicate Cogwahymnals REST endpoints
(function () {
  'use strict';

  angular
    .module('cogwahymnals')
    .factory('CogwahymnalsService', CogwahymnalsService);

  CogwahymnalsService.$inject = ['$resource'];

  function CogwahymnalsService($resource) {
    return $resource('api/cogwahymnals/:cogwahymnalId', {
      cogwahymnalId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
