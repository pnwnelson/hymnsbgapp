(function () {
  'use strict';

  angular
    .module('hymnals')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('hymnals', {
        abstract: true,
        url: '/hymnals',
        template: '<ui-view/>'
      })
      .state('hymnals.list', {
        url: '',
        templateUrl: 'modules/hymnals/client/views/list-hymnals.client.view.html',
        controller: 'HymnalsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Hymnals List'
        }
      })
      .state('hymnals.create', {
        url: '/create',
        templateUrl: 'modules/hymnals/client/views/form-hymnal.client.view.html',
        controller: 'HymnalsController',
        controllerAs: 'vm',
        resolve: {
          hymnalResolve: newHymnal
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Hymnals Create'
        }
      })
      .state('hymnals.edit', {
        url: '/:hymnalId/edit',
        templateUrl: 'modules/hymnals/client/views/form-hymnal.client.view.html',
        controller: 'HymnalsController',
        controllerAs: 'vm',
        resolve: {
          hymnalResolve: getHymnal
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Hymnal {{ hymnalResolve.name }}'
        }
      })
      .state('hymnals.view', {
        url: '/:hymnalId',
        templateUrl: 'modules/hymnals/client/views/view-hymnal.client.view.html',
        controller: 'HymnalsController',
        controllerAs: 'vm',
        resolve: {
          hymnalResolve: getHymnal
        },
        data: {
          pageTitle: 'Hymnal {{ hymnalResolve.name }}'
        }
      });
  }

  getHymnal.$inject = ['$stateParams', 'HymnalsService'];

  function getHymnal($stateParams, HymnalsService) {
    return HymnalsService.get({
      hymnalId: $stateParams.hymnalId
    }).$promise;
  }

  newHymnal.$inject = ['HymnalsService'];

  function newHymnal(HymnalsService) {
    return new HymnalsService();
  }
}());
