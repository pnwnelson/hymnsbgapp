(function () {
  'use strict';

  angular
    .module('ucgv1hymnals')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('ucgv1hymnals', {
        abstract: true,
        url: '/ucgv1hymnals',
        template: '<ui-view/>'
      })
      .state('ucgv1hymnals.list', {
        url: '',
        templateUrl: 'modules/ucgv1hymnals/client/views/list-ucgv1hymnals.client.view.html',
        controller: 'Ucgv1hymnalsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Ucgv1hymnals List'
        }
      })
      .state('ucgv1hymnals.create', {
        url: '/create',
        templateUrl: 'modules/ucgv1hymnals/client/views/form-ucgv1hymnal.client.view.html',
        controller: 'Ucgv1hymnalsController',
        controllerAs: 'vm',
        resolve: {
          ucgv1hymnalResolve: newUcgv1hymnal
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Ucgv1hymnals Create'
        }
      })
      .state('ucgv1hymnals.edit', {
        url: '/:ucgv1hymnalId/edit',
        templateUrl: 'modules/ucgv1hymnals/client/views/form-ucgv1hymnal.client.view.html',
        controller: 'Ucgv1hymnalsController',
        controllerAs: 'vm',
        resolve: {
          ucgv1hymnalResolve: getUcgv1hymnal
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Ucgv1hymnal {{ ucgv1hymnalResolve.name }}'
        }
      })
      .state('ucgv1hymnals.view', {
        url: '/:ucgv1hymnalId',
        templateUrl: 'modules/ucgv1hymnals/client/views/view-ucgv1hymnal.client.view.html',
        controller: 'Ucgv1hymnalsController',
        controllerAs: 'vm',
        resolve: {
          ucgv1hymnalResolve: getUcgv1hymnal
        },
        data: {
          pageTitle: 'Ucgv1hymnal {{ ucgv1hymnalResolve.name }}'
        }
      });
  }

  getUcgv1hymnal.$inject = ['$stateParams', 'Ucgv1hymnalsService'];

  function getUcgv1hymnal($stateParams, Ucgv1hymnalsService) {
    return Ucgv1hymnalsService.get({
      ucgv1hymnalId: $stateParams.ucgv1hymnalId
    }).$promise;
  }

  newUcgv1hymnal.$inject = ['Ucgv1hymnalsService'];

  function newUcgv1hymnal(Ucgv1hymnalsService) {
    return new Ucgv1hymnalsService();
  }
}());
