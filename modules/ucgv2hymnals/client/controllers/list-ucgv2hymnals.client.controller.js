(function () {
  'use strict';

  angular
    .module('ucgv2hymnals')
    .controller('Ucgv2hymnalsListController', Ucgv2hymnalsListController);

  Ucgv2hymnalsListController.$inject = ['Ucgv2hymnalsService','$state'];

  function Ucgv2hymnalsListController(Ucgv2hymnalsService, $state) {
    var vm = this;

    vm.ucgv2hymnals = Ucgv2hymnalsService.query();
    vm.search = function() {
      $state.go('purplehymnals.view', { purplehymnalId: vm.searchTerm });
    };
  }
}());
