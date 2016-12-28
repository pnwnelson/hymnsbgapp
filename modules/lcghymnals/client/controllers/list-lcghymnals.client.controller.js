(function () {
  'use strict';

  angular
    .module('lcghymnals')
    .controller('LcghymnalsListController', LcghymnalsListController);

  LcghymnalsListController.$inject = ['LcghymnalsService', '$state'];

  function LcghymnalsListController(LcghymnalsService, $state) {
    var vm = this;

    vm.lcghymnals = LcghymnalsService.query();

    vm.search = function() {

      $state.go('lcghymnals.view', { lcghymnalId: vm.searchTerm });
    };
  }
}());
