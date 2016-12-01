(function () {
  'use strict';

  angular
    .module('wcg1993hymnals')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('wcg1993hymnals', {
        abstract: true,
        url: '/wcg1993hymnals',
        template: '<ui-view/>'
      })
      .state('wcg1993hymnals.list', {
        url: '',
        templateUrl: 'modules/wcg1993hymnals/client/views/list-wcg1993hymnals.client.view.html',
        controller: 'Wcg1993hymnalsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Wcg1993hymnals List'
        }
      })
      .state('wcg1993hymnals.create', {
        url: '/create',
        templateUrl: 'modules/wcg1993hymnals/client/views/form-wcg1993hymnal.client.view.html',
        controller: 'Wcg1993hymnalsController',
        controllerAs: 'vm',
        resolve: {
          wcg1993hymnalResolve: newWcg1993hymnal
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Wcg1993hymnals Create'
        }
      })
      .state('wcg1993hymnals.edit', {
        url: '/:wcg1993hymnalId/edit',
        templateUrl: 'modules/wcg1993hymnals/client/views/form-wcg1993hymnal.client.view.html',
        controller: 'Wcg1993hymnalsController',
        controllerAs: 'vm',
        resolve: {
          wcg1993hymnalResolve: getWcg1993hymnal
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Wcg1993hymnal {{ wcg1993hymnalResolve.name }}'
        }
      })
      .state('wcg1993hymnals.view', {
        url: '/:wcg1993hymnalId',
        templateUrl: 'modules/wcg1993hymnals/client/views/view-wcg1993hymnal.client.view.html',
        controller: 'Wcg1993hymnalsController',
        controllerAs: 'vm',
        resolve: {
          wcg1993hymnalResolve: getWcg1993hymnal
        },
        data: {
          pageTitle: 'Wcg1993hymnal {{ wcg1993hymnalResolve.name }}'
        }
      });
  }

  getWcg1993hymnal.$inject = ['$stateParams', 'Wcg1993hymnalsService'];

  function getWcg1993hymnal($stateParams, Wcg1993hymnalsService) {
    return Wcg1993hymnalsService.get({
      wcg1993hymnalId: $stateParams.wcg1993hymnalId
    }).$promise;
  }

  newWcg1993hymnal.$inject = ['Wcg1993hymnalsService'];

  function newWcg1993hymnal(Wcg1993hymnalsService) {
    return new Wcg1993hymnalsService();
  }
}());
