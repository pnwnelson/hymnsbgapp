// Ucgv2hymnals service used to communicate Ucgv2hymnals REST endpoints
(function () {
  'use strict';

  angular
    .module('ucgv2hymnals')
    .factory('Ucgv2hymnalsService', Ucgv2hymnalsService);

  Ucgv2hymnalsService.$inject = ['$resource'];

  function Ucgv2hymnalsService($resource) {
    return $resource('api/ucgv2hymnals/:ucgv2hymnalId', {
      ucgv2hymnalId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
