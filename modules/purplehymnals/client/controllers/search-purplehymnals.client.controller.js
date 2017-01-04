(function () {
  'use strict';

  angular
    .module('purplehymnals')
    .controller('PurplehymnalsSearchController', PurplehymnalsSearchController);

  PurplehymnalsSearchController.$inject = ['PurplehymnalsService','$state'];

  function PurplehymnalsSearchController(PurplehymnalsService, $state) {
    var vm = this;

    vm.purplehymnals = PurplehymnalsService.query();
    
    vm.search = function() {
      $state.go('purplehymnals.view', { purplehymnalId: vm.searchTerm });
    };
  }
}());