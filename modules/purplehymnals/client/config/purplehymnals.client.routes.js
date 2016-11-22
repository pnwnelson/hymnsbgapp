(function () {
  'use strict';

  angular
    .module('purplehymnals')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('purplehymnals', {
        abstract: true,
        url: '/purplehymnals',
        template: '<ui-view/>'
      })
      .state('purplehymnals.list', {
        url: '',
        templateUrl: 'modules/purplehymnals/client/views/list-purplehymnals.client.view.html',
        controller: 'PurplehymnalsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Purplehymnals List'
        }
      })
      .state('purplehymnals.search', {
        url:'/search',
        templateUrl: 'modules/purplehymnals/client/views/search-purplehymnals.client.view.html',
        controller: 'PurplehymnalsSearchController',
        controllerAs:'vm',
        data: {
          pageTitle: 'Purplehymnals Search'
        }
      })
      .state('purplehymnals.create', {
        url: '/create',
        templateUrl: 'modules/purplehymnals/client/views/form-purplehymnal.client.view.html',
        controller: 'PurplehymnalsController',
        controllerAs: 'vm',
        resolve: {
          purplehymnalResolve: newPurplehymnal
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Purplehymnals Create'
        }
      })
      .state('purplehymnals.edit', {
        url: '/:purplehymnalId/edit',
        templateUrl: 'modules/purplehymnals/client/views/form-purplehymnal.client.view.html',
        controller: 'PurplehymnalsController',
        controllerAs: 'vm',
        resolve: {
          purplehymnalResolve: getPurplehymnal
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Purplehymnal {{ purplehymnalResolve.name }}'
        }
      })
      .state('purplehymnals.view', {
        url: '/:purplehymnalId',
        templateUrl: 'modules/purplehymnals/client/views/view-purplehymnal.client.view.html',
        controller: 'PurplehymnalsController',
        controllerAs: 'vm',
        resolve: {
          purplehymnalResolve: getPurplehymnal
        },
        data: {
          pageTitle: 'Purplehymnal {{ purplehymnalResolve.name }}'
        }
      });
  }

  getPurplehymnal.$inject = ['$stateParams', 'PurplehymnalsService'];

  function getPurplehymnal($stateParams, PurplehymnalsService) {
    return PurplehymnalsService.get({
      purplehymnalId: $stateParams.purplehymnalId
    }).$promise;
  }

  newPurplehymnal.$inject = ['PurplehymnalsService'];

  function newPurplehymnal(PurplehymnalsService) {
    return new PurplehymnalsService();
  }
}());
