(function () {
  'use strict';

  angular
    .module('purplehymnals')
    .controller('PurplehymnalsListController', PurplehymnalsListController);

  PurplehymnalsListController.$inject = ['PurplehymnalsService', '$state'];

  function PurplehymnalsListController(PurplehymnalsService, $state) {
    var vm = this;
    var showPurpleHymanls = false;

    vm.purplehymnals = PurplehymnalsService.query();

    vm.search = function() {
      $state.go('purplehymnals.view', { purplehymnalId: vm.searchTerm });
    };

    vm.toggleHymnList = function () {
      vm.showPurpleHymanls = !vm.showPurpleHymanls;
    };
  }
}());
