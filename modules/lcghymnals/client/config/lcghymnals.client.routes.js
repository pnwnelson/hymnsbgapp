(function () {
  'use strict';

  angular
    .module('lcghymnals')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('lcghymnals', {
        abstract: true,
        url: '/lcghymnals',
        template: '<ui-view/>'
      })
      .state('lcghymnals.list', {
        url: '',
        templateUrl: 'modules/lcghymnals/client/views/list-lcghymnals.client.view.html',
        controller: 'LcghymnalsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Lcghymnals List'
        }
      })
      .state('lcghymnals.create', {
        url: '/create',
        templateUrl: 'modules/lcghymnals/client/views/form-lcghymnal.client.view.html',
        controller: 'LcghymnalsController',
        controllerAs: 'vm',
        resolve: {
          lcghymnalResolve: newLcghymnal
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Lcghymnals Create'
        }
      })
      .state('lcghymnals.edit', {
        url: '/:lcghymnalId/edit',
        templateUrl: 'modules/lcghymnals/client/views/form-lcghymnal.client.view.html',
        controller: 'LcghymnalsController',
        controllerAs: 'vm',
        resolve: {
          lcghymnalResolve: getLcghymnal
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Lcghymnal {{ lcghymnalResolve.name }}'
        }
      })
      .state('lcghymnals.view', {
        url: '/:lcghymnalId',
        templateUrl: 'modules/lcghymnals/client/views/view-lcghymnal.client.view.html',
        controller: 'LcghymnalsController',
        controllerAs: 'vm',
        resolve: {
          lcghymnalResolve: getLcghymnal
        },
        data: {
          pageTitle: 'Lcghymnal {{ lcghymnalResolve.name }}'
        }
      });
  }

  getLcghymnal.$inject = ['$stateParams', 'LcghymnalsService'];

  function getLcghymnal($stateParams, LcghymnalsService) {
    return LcghymnalsService.get({
      lcghymnalId: $stateParams.lcghymnalId
    }).$promise;
  }

  newLcghymnal.$inject = ['LcghymnalsService'];

  function newLcghymnal(LcghymnalsService) {
    return new LcghymnalsService();
  }
}());
