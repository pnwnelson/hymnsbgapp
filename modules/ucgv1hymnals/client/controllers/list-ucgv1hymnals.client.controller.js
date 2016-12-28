(function () {
  'use strict';

  angular
    .module('ucgv1hymnals')
    .controller('Ucgv1hymnalsListController', Ucgv1hymnalsListController);

  Ucgv1hymnalsListController.$inject = ['Ucgv1hymnalsService','$state'];

  function Ucgv1hymnalsListController(Ucgv1hymnalsService, $state) {
    var vm = this;

    vm.ucgv1hymnals = Ucgv1hymnalsService.query();

    vm.search = function() {
      $state.go('purplehymnals.view', { purplehymnalId: vm.searchTerm });
    };
  }
}());
