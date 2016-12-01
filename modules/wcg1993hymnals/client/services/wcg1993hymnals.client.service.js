// Wcg1993hymnals service used to communicate Wcg1993hymnals REST endpoints
(function () {
  'use strict';

  angular
    .module('wcg1993hymnals')
    .factory('Wcg1993hymnalsService', Wcg1993hymnalsService);

  Wcg1993hymnalsService.$inject = ['$resource'];

  function Wcg1993hymnalsService($resource) {
    return $resource('api/wcg1993hymnals/:wcg1993hymnalId', {
      wcg1993hymnalId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
