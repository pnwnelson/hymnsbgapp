// Lcghymnals service used to communicate Lcghymnals REST endpoints
(function () {
  'use strict';

  angular
    .module('lcghymnals')
    .factory('LcghymnalsService', LcghymnalsService);

  LcghymnalsService.$inject = ['$resource'];

  function LcghymnalsService($resource) {
    return $resource('api/lcghymnals/:lcghymnalId', {
      lcghymnalId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
