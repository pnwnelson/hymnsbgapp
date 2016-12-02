// Ucgv1hymnals service used to communicate Ucgv1hymnals REST endpoints
(function () {
  'use strict';

  angular
    .module('ucgv1hymnals')
    .factory('Ucgv1hymnalsService', Ucgv1hymnalsService);

  Ucgv1hymnalsService.$inject = ['$resource'];

  function Ucgv1hymnalsService($resource) {
    return $resource('api/ucgv1hymnals/:ucgv1hymnalId', {
      ucgv1hymnalId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
