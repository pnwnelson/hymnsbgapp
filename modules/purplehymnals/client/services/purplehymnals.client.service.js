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


