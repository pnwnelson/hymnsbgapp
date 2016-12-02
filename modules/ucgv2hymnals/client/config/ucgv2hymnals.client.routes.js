(function () {
  'use strict';

  angular
    .module('ucgv2hymnals')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('ucgv2hymnals', {
        abstract: true,
        url: '/ucgv2hymnals',
        template: '<ui-view/>'
      })
      .state('ucgv2hymnals.list', {
        url: '',
        templateUrl: 'modules/ucgv2hymnals/client/views/list-ucgv2hymnals.client.view.html',
        controller: 'Ucgv2hymnalsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Ucgv2hymnals List'
        }
      })
      .state('ucgv2hymnals.create', {
        url: '/create',
        templateUrl: 'modules/ucgv2hymnals/client/views/form-ucgv2hymnal.client.view.html',
        controller: 'Ucgv2hymnalsController',
        controllerAs: 'vm',
        resolve: {
          ucgv2hymnalResolve: newUcgv2hymnal
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Ucgv2hymnals Create'
        }
      })
      .state('ucgv2hymnals.edit', {
        url: '/:ucgv2hymnalId/edit',
        templateUrl: 'modules/ucgv2hymnals/client/views/form-ucgv2hymnal.client.view.html',
        controller: 'Ucgv2hymnalsController',
        controllerAs: 'vm',
        resolve: {
          ucgv2hymnalResolve: getUcgv2hymnal
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Ucgv2hymnal {{ ucgv2hymnalResolve.name }}'
        }
      })
      .state('ucgv2hymnals.view', {
        url: '/:ucgv2hymnalId',
        templateUrl: 'modules/ucgv2hymnals/client/views/view-ucgv2hymnal.client.view.html',
        controller: 'Ucgv2hymnalsController',
        controllerAs: 'vm',
        resolve: {
          ucgv2hymnalResolve: getUcgv2hymnal
        },
        data: {
          pageTitle: 'Ucgv2hymnal {{ ucgv2hymnalResolve.name }}'
        }
      });
  }

  getUcgv2hymnal.$inject = ['$stateParams', 'Ucgv2hymnalsService'];

  function getUcgv2hymnal($stateParams, Ucgv2hymnalsService) {
    return Ucgv2hymnalsService.get({
      ucgv2hymnalId: $stateParams.ucgv2hymnalId
    }).$promise;
  }

  newUcgv2hymnal.$inject = ['Ucgv2hymnalsService'];

  function newUcgv2hymnal(Ucgv2hymnalsService) {
    return new Ucgv2hymnalsService();
  }
}());
