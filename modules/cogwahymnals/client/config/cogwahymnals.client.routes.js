(function () {
  'use strict';

  angular
    .module('cogwahymnals')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('cogwahymnals', {
        abstract: true,
        url: '/cogwahymnals',
        template: '<ui-view/>'
      })
      .state('cogwahymnals.list', {
        url: '',
        templateUrl: 'modules/cogwahymnals/client/views/list-cogwahymnals.client.view.html',
        controller: 'CogwahymnalsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Cogwahymnals List'
        }
      })
      .state('cogwahymnals.create', {
        url: '/create',
        templateUrl: 'modules/cogwahymnals/client/views/form-cogwahymnal.client.view.html',
        controller: 'CogwahymnalsController',
        controllerAs: 'vm',
        resolve: {
          cogwahymnalResolve: newCogwahymnal
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Cogwahymnals Create'
        }
      })
      .state('cogwahymnals.edit', {
        url: '/:cogwahymnalId/edit',
        templateUrl: 'modules/cogwahymnals/client/views/form-cogwahymnal.client.view.html',
        controller: 'CogwahymnalsController',
        controllerAs: 'vm',
        resolve: {
          cogwahymnalResolve: getCogwahymnal
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Cogwahymnal {{ cogwahymnalResolve.name }}'
        }
      })
      .state('cogwahymnals.view', {
        url: '/:cogwahymnalId',
        templateUrl: 'modules/cogwahymnals/client/views/view-cogwahymnal.client.view.html',
        controller: 'CogwahymnalsController',
        controllerAs: 'vm',
        resolve: {
          cogwahymnalResolve: getCogwahymnal
        },
        data: {
          pageTitle: 'Cogwahymnal {{ cogwahymnalResolve.name }}'
        }
      });
  }

  getCogwahymnal.$inject = ['$stateParams', 'CogwahymnalsService'];

  function getCogwahymnal($stateParams, CogwahymnalsService) {
    return CogwahymnalsService.get({
      cogwahymnalId: $stateParams.cogwahymnalId
    }).$promise;
  }

  newCogwahymnal.$inject = ['CogwahymnalsService'];

  function newCogwahymnal(CogwahymnalsService) {
    return new CogwahymnalsService();
  }
}());
