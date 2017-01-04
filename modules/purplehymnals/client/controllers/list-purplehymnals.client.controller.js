(function () {
  'use strict';

  angular
    .module('purplehymnals')
    .controller('PurplehymnalsListController', PurplehymnalsListController);

  PurplehymnalsListController.$inject = ['PurplehymnalsService', '$state'];

  function PurplehymnalsListController(PurplehymnalsService, $state) {
    var vm = this;

    vm.purplehymnals = PurplehymnalsService.query();

    vm.search = function() {
      $state.go('purplehymnals.view', { purplehymnalId: vm.searchTerm });
    };
  }
}());
