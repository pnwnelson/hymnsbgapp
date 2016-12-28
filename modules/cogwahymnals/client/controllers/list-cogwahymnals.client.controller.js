(function () {
  'use strict';

  angular
    .module('cogwahymnals')
    .controller('CogwahymnalsListController', CogwahymnalsListController);

  CogwahymnalsListController.$inject = ['CogwahymnalsService','$state'];

  function CogwahymnalsListController(CogwahymnalsService, $state) {
    var vm = this;

    vm.cogwahymnals = CogwahymnalsService.query();

    vm.search = function() {
      $state.go('purplehymnals.view', { purplehymnalId: vm.searchTerm });
    };
  }
}());
